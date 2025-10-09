import { useEffect, useState } from 'react';
import { createTeamMember, deleteTeamMember, listTeamMembers, updateTeamMember } from '../../services/team.js';
import { FaEdit, FaTimes, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ManagePageLayout } from './ManagePageLayout.jsx';

export function ManageTeam() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [editingMember, setEditingMember] = useState(null);

  async function refresh() {
    const data = await listTeamMembers();
    setMembers(data);
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (editingMember) {
      await updateTeamMember(editingMember.id, { name, role, photoUrl, linkedinUrl });
      setEditingMember(null);
    } else {
      await createTeamMember({ name, role, photoUrl, linkedinUrl });
    }
    setName(''); setRole(''); setPhotoUrl(''); setLinkedinUrl('');
    refresh();
  }

  function onEdit(member) {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setPhotoUrl(member.photoUrl);
    setLinkedinUrl(member.linkedinUrl);
  }

  function onCancelEdit() {
    setEditingMember(null);
    setName('');
    setRole('');
    setPhotoUrl('');
    setLinkedinUrl('');
  }

  async function move(index, direction) {
    const newMembers = [...members];
    const [member] = newMembers.splice(index, 1);
    newMembers.splice(index + direction, 0, member);

    for (let i = 0; i < newMembers.length; i++) {
      if (newMembers[i].order !== i) {
        await updateTeamMember(newMembers[i].id, { order: i });
      }
    }
    refresh();
  }

  return (
    <ManagePageLayout title="Manage Team">
      <table className="manage-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.role}</td>
              <td><img src={m.photoUrl} alt={m.name} width={50} style={{borderRadius: '50%'}}/></td>
              <td className="manage-table-actions">
                <button className='btn-icon' onClick={() => onEdit(m)}><FaEdit /></button>
                {i > 0 && <button className='btn-icon' onClick={() => { move(i, -1); }}><FaArrowUp /></button>}
                {i < members.length - 1 && <button className='btn-icon' onClick={() => { move(i, 1); }}><FaArrowDown /></button>}
                <button className='btn-icon btn-danger' onClick={() => { deleteTeamMember(m.id).then(refresh); }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h3>{editingMember ? 'Edit Member' : 'Add New Member'}</h3>
        <form onSubmit={onSubmit} className="form">
            <div className="form-row">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="form-row">
                <input placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                <input placeholder="LinkedIn URL" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
            </div>
          {editingMember ? (
            <div className="form-actions">
              <button type="submit" className="btn">Update</button>
              <button type="button" className="btn btn-secondary" onClick={onCancelEdit}><FaTimes /></button>
            </div>
          ) : (
            <button type="submit" className="btn">Add Member</button>
          )}
        </form>
      </div>
    </ManagePageLayout>
  );
}

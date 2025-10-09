import { useEffect, useState } from 'react';
import { createStartup, deleteStartup, listStartups, updateStartup } from '../../services/startups.js';
import { FaEdit, FaTimes, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ManagePageLayout } from './ManagePageLayout.jsx';

export function ManageStartups() {
  const [startups, setStartups] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [editingStartup, setEditingStartup] = useState(null);

  async function refresh() {
    const data = await listStartups();
    setStartups(data);
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (editingStartup) {
      await updateStartup(editingStartup.id, { name, description, website });
      setEditingStartup(null);
    } else {
      await createStartup({ name, description, website });
    }
    setName(''); setDescription(''); setWebsite('');
    refresh();
  }

  function onEdit(startup) {
    setEditingStartup(startup);
    setName(startup.name);
    setDescription(startup.description);
    setWebsite(startup.website);
  }

  function onCancelEdit() {
    setEditingStartup(null);
    setName('');
    setDescription('');
    setWebsite('');
  }

  async function move(index, direction) {
    const newStartups = [...startups];
    const [startup] = newStartups.splice(index, 1);
    newStartups.splice(index + direction, 0, startup);

    for (let i = 0; i < newStartups.length; i++) {
      if (newStartups[i].order !== i) {
        await updateStartup(newStartups[i].id, { order: i });
      }
    }
    refresh();
  }

  return (
    <ManagePageLayout title="Manage Startups">
      <table className="manage-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {startups.map((s, i) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td><a href={s.website} target='_blank' rel='noreferrer'>{s.website}</a></td>
              <td className="manage-table-actions">
                <button className='btn-icon' onClick={() => onEdit(s)}><FaEdit /></button>
                {i > 0 && <button className='btn-icon' onClick={() => { move(i, -1); }}><FaArrowUp /></button>}
                {i < startups.length - 1 && <button className='btn-icon' onClick={() => { move(i, 1); }}><FaArrowDown /></button>}
                <button className='btn-icon btn-danger' onClick={() => { deleteStartup(s.id).then(refresh); }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h3>{editingStartup ? 'Edit Startup' : 'Add New Startup'}</h3>
        <form onSubmit={onSubmit} className="form">
            <div className="form-row">
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          {editingStartup ? (
            <div className="form-actions">
              <button type="submit" className="btn">Update</button>
              <button type="button" className="btn btn-secondary" onClick={onCancelEdit}><FaTimes /></button>
            </div>
          ) : (
            <button type="submit" className="btn">Add Startup</button>
          )}
        </form>
      </div>
    </ManagePageLayout>
  );
}

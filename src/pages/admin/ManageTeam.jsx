import { useEffect, useState } from 'react'
import { createTeamMember, deleteTeamMember, listTeamMembers } from '../../services/team.js'

export function ManageTeam() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  async function refresh() {
    const data = await listTeamMembers()
    setMembers(data)
  }

  useEffect(() => { refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createTeamMember({ name, role, photoUrl })
    setName(''); setRole(''); setPhotoUrl('')
    refresh()
  }

  return (
    <div>
      <h3>Manage Team</h3>
      <form onSubmit={onCreate} className="form">
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Role" value={role} onChange={(e)=>setRole(e.target.value)} />
        <input placeholder="Photo URL" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {members.map(m => (
          <li key={m.id}>
            <strong>{m.name}</strong> — {m.role}
            <button onClick={()=>{ deleteTeamMember(m.id).then(refresh) }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}



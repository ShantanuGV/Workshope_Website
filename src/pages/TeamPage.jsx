import { useEffect, useState } from 'react'
import { listTeamMembers } from '../services/team.js'

export function TeamPage() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    listTeamMembers().then(setMembers)
  }, [])

  return (
    <section className="container">
      <h2>Team</h2>
      {members.length === 0 && <p>No team members yet.</p>}
      <div className="grid">
        {members.map((m) => (
          <article key={m.id} className="card">
            {m.photoUrl && <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </article>
        ))}
      </div>
    </section>
  )
}



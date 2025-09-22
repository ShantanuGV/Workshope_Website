import { useEffect, useState } from 'react'
import { createStartup, deleteStartup, listStartups } from '../../services/startups.js'

export function ManageStartups() {
  const [startups, setStartups] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')

  async function refresh() {
    const data = await listStartups()
    setStartups(data)
  }

  useEffect(() => { refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createStartup({ name, description, website })
    setName(''); setDescription(''); setWebsite('')
    refresh()
  }

  return (
    <div>
      <h3>Manage Startups</h3>
      <form onSubmit={onCreate} className="form">
        <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input placeholder="Website" value={website} onChange={(e)=>setWebsite(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {startups.map(s => (
          <li key={s.id}>
            <strong>{s.name}</strong>
            <button onClick={()=>{ deleteStartup(s.id).then(refresh) }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}



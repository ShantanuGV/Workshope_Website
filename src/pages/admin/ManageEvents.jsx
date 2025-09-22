import { useEffect, useState } from 'react'
import { createEvent, deleteEvent, listEvents } from '../../services/events.js'

export function ManageEvents() {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  async function refresh() {
    const data = await listEvents()
    setEvents(data)
  }

  useEffect(() => { refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createEvent({ title, description, date: new Date(date).getTime() })
    setTitle(''); setDescription(''); setDate('')
    refresh()
  }

  return (
    <div>
      <h3>Manage Events</h3>
      <form onSubmit={onCreate} className="form">
        <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <strong>{ev.title}</strong> — {ev.description}
            <button onClick={()=>{ deleteEvent(ev.id).then(refresh) }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}



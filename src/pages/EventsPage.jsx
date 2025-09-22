import { useEffect, useState } from 'react'
import { listEvents } from '../services/events.js'

export function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    listEvents().then(setEvents)
  }, [])

  return (
    <section className="container">
      <h2>Events</h2>
      {events.length === 0 && <p>No events yet.</p>}
      <div className="grid">
        {events.map((ev) => (
          <article key={ev.id} className="card">
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
            {ev.date && <p><strong>Date:</strong> {new Date(ev.date.seconds ? ev.date.seconds * 1000 : ev.date).toLocaleDateString()}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}



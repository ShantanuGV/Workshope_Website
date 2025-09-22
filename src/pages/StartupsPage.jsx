import { useEffect, useState } from 'react'
import { listStartups } from '../services/startups.js'

export function StartupsPage() {
  const [startups, setStartups] = useState([])

  useEffect(() => {
    listStartups().then(setStartups)
  }, [])

  return (
    <section className="container">
      <h2>Our Startups</h2>
      {startups.length === 0 && <p>No startups listed yet.</p>}
      <div className="grid">
        {startups.map((s) => (
          <article key={s.id} className="card">
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            {s.website && <a href={s.website} target="_blank" rel="noreferrer">Visit</a>}
          </article>
        ))}
      </div>
    </section>
  )
}



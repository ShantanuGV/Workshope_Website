import { useEffect, useState } from 'react';
import { listStartups } from '../services/startups.js';
import { FiArrowRight } from 'react-icons/fi';
import './StartupsPage.css';

export function StartupsPage() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    listStartups().then(setStartups);
  }, []);

  return (
    <section className="startups-page fade-in">
      <h1 className="page-title slide-in-up">Our Startups</h1>
      {startups.length > 0 ? (
        <div className="startups-grid">
          {startups.map((s) => (
            <article key={s.id} className="card startup-card slide-in-up">
              <h3 className="startup-card-name">{s.name}</h3>
              <p className="startup-card-description">{s.description}</p>
              {s.website && 
                <a href={s.website} target="_blank" rel="noreferrer" className="startup-card-website-link">
                    Visit Website
                    <FiArrowRight className="website-link-icon"/>
                </a>
              }
            </article>
          ))}
        </div>
      ) : (
        <div className="no-events-message slide-in-up">
            <p>No startups listed yet.</p>
        </div>
      )}
    </section>
  )
}

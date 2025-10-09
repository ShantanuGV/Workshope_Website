import { useEffect, useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { listEvents } from '../services/events.js';
import './EventsPage.css';

export function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);

  useEffect(() => {
    listEvents().then(events => {
      const now = new Date();
      const upcoming = [];
      const previous = [];

      events.forEach(event => {
        const eventDate = new Date(event.date.seconds ? event.date.seconds * 1000 : event.date);
        if (eventDate >= now) {
          upcoming.push(event);
        } else {
          previous.push(event);
        }
      });

      upcoming.sort((a, b) => new Date(a.date.seconds ? a.date.seconds * 1000 : a.date) - new Date(b.date.seconds ? b.date.seconds * 1000 : b.date));
      previous.sort((a, b) => new Date(b.date.seconds ? b.date.seconds * 1000 : b.date) - new Date(a.date.seconds ? a.date.seconds * 1000 : a.date));

      setUpcomingEvents(upcoming);
      setPreviousEvents(previous);
    });
  }, []);

  return (
    <section className="events-page fade-in">
      <h1 className="page-title slide-in-up">Events</h1>

      <div className="events-section">
        <h2 className="section-title slide-in-up">
          <FiCalendar className="section-icon" />
          Upcoming Events
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="events-grid">
            {upcomingEvents.map((ev) => (
              <article key={ev.id} className="card event-card slide-in-up">
                <h3>{ev.title}</h3>
                <p>{ev.description}</p>
                {ev.date && (
                  <p className="event-date">
                    <strong>Date:</strong>{' '}
                    {new Date(ev.date.seconds ? ev.date.seconds * 1000 : ev.date).toLocaleDateString()}
                  </p>
                )}
                {ev.registrationLink && (
                  <a href={ev.registrationLink} target="_blank" rel="noopener noreferrer" className="btn event-register-btn">
                    Register Now
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="no-events-message slide-in-up">
            <p>No upcoming events at the moment. Please check back later!</p>
          </div>
        )}
      </div>

      <div className="events-section">
        <h2 className="section-title slide-in-up">
          <FiClock className="section-icon" />
          Previous Events
        </h2>
        {previousEvents.length > 0 ? (
          <div className="events-grid">
            {previousEvents.map((ev) => (
              <article key={ev.id} className="card event-card slide-in-up">
                <h3>{ev.title}</h3>
                <p>{ev.description}</p>
                {ev.date && (
                  <p className="event-date">
                    <strong>Date:</strong>{' '}
                    {new Date(ev.date.seconds ? ev.date.seconds * 1000 : ev.date).toLocaleDateString()}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="no-events-message slide-in-up">
            <p>No previous events to show.</p>
          </div>
        )}
      </div>
    </section>
  );
}

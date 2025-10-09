import { useEffect, useState } from 'react';
import { listTeamMembers } from '../services/team.js';
import { FaLinkedin } from 'react-icons/fa';
import './TeamPage.css';

export function TeamPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    listTeamMembers().then(setMembers);
  }, []);

  return (
    <section className="team-page fade-in">
      <h1 className="page-title slide-in-up">Meet Our Team</h1>

      {members.length > 0 ? (
        <div className="team-grid">
          {members.map((member) => (
            <article key={member.id} className="card team-card slide-in-up">
              <div className="team-card-image-container">
                {member.photoUrl ? (
                  <img 
                    src={member.photoUrl} 
                    alt={member.name} 
                    className="team-card-image" 
                  />
                ) : (
                  <div className="team-card-image-placeholder">No Image</div>
                )}
              </div>
              <div className="team-card-content">
                <h3 className="team-card-name">{member.name}</h3>
                <p className="team-card-role">{member.role}</p>
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                    <FaLinkedin size={28} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-events-message slide-in-up">
            <p>No team members to display.</p>
        </div>
      )}
    </section>
  );
}

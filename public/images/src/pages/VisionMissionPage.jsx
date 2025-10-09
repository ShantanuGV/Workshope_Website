import { FiEye, FiTarget, FiCheckCircle } from 'react-icons/fi';
import './VisionMissionPage.css';

export function VisionMissionPage() {
  return (
    <section className="vision-mission-page fade-in">
      <h1 className="page-title slide-in-up">Our Vision & Mission</h1>
      <div className="content-grid">
        <div className="card card-item slide-in-up">
          <div className="card-icon"><FiEye /></div>
          <h2 className="card-title">Vision</h2>
          <p className="card-text">To create an entrepreneurial culture that nurtures innovation, fosters creativity, and empowers the next generation of leaders to drive societal impact and economic growth.</p>
        </div>
        <div className="card card-item slide-in-up">
          <div className="card-icon"><FiTarget /></div>
          <h2 className="card-title">Mission</h2>
          <ul className="mission-list">
            <li className="mission-list-item">
              <span className="mission-list-icon"><FiCheckCircle /></span>
              Promote ideation, experimentation, and product development among students.
            </li>
            <li className="mission-list-item">
              <span className="mission-list-icon"><FiCheckCircle /></span>
              Mentor and guide aspiring student founders and their teams.
            </li>
            <li className="mission-list-item">
              <span className="mission-list-icon"><FiCheckCircle /></span>
              Provide seamless access to workshops, funding opportunities, and industry networks.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

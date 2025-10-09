import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../services/auth.js';
import './Dashboard.css';
import { FiCalendar, FiUsers, FiFileText, FiBox } from 'react-icons/fi';

export function AdminDashboard() {
  const { user } = useAuthState();
  const [stats, setStats] = useState({ events: 0, team: 0, blogs: 0, startups: 0 });

  

  return (
    <div className="dashboard-page fade-in">
      <h2>Welcome, {user?.email}</h2>

      <div className="dashboard-stats slide-in-up">
        <div className="stat-card">
            <FiCalendar className="stat-card-icon" />
            <div className="stat-card-info">
                <h4>{stats.events}</h4>
                <p>Workshopes</p>
            </div>
        </div>
      </div>

      <h3>Quick Links</h3>
      <div className="dashboard-quick-links slide-in-up">
        <Link to="/admin/certificates" className="quick-link-card">
            <FiFileText className="quick-link-icon" />
            <h4>Manage Certificat</h4>
        </Link>
      </div>
    </div>
  );
}

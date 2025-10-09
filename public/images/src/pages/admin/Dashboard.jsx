import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../services/auth.js';
import { listEvents } from '../../services/events.js';
import { listTeamMembers } from '../../services/team.js';
import { listBlogs } from '../../services/blogs.js';
import { listStartups } from '../../services/startups.js';
import './Dashboard.css';
import { FiCalendar, FiUsers, FiFileText, FiBox } from 'react-icons/fi';

export function AdminDashboard() {
  const { user } = useAuthState();
  const [stats, setStats] = useState({ events: 0, team: 0, blogs: 0, startups: 0 });

  useEffect(() => {
    Promise.all([
      listEvents().then(res => res.length),
      listTeamMembers().then(res => res.length),
      listBlogs().then(res => res.length),
      listStartups().then(res => res.length)
    ]).then(([events, team, blogs, startups]) => setStats({ events, team, blogs, startups }));
  }, []);

  return (
    <div className="dashboard-page fade-in">
      <h2>Welcome, {user?.email}</h2>

      <div className="dashboard-stats slide-in-up">
        <div className="stat-card">
            <FiCalendar className="stat-card-icon" />
            <div className="stat-card-info">
                <h4>{stats.events}</h4>
                <p>Events</p>
            </div>
        </div>
        <div className="stat-card">
            <FiUsers className="stat-card-icon" />
            <div className="stat-card-info">
                <h4>{stats.team}</h4>
                <p>Team Members</p>
            </div>
        </div>
        <div className="stat-card">
            <FiFileText className="stat-card-icon" />
            <div className="stat-card-info">
                <h4>{stats.blogs}</h4>
                <p>Blogs</p>
            </div>
        </div>
        <div className="stat-card">
            <FiBox className="stat-card-icon" />
            <div className="stat-card-info">
                <h4>{stats.startups}</h4>
                <p>Startups</p>
            </div>
        </div>
      </div>

      <h3>Quick Links</h3>
      <div className="dashboard-quick-links slide-in-up">
        <Link to="/admin/events" className="quick-link-card">
            <FiCalendar className="quick-link-icon" />
            <h4>Manage Events</h4>
        </Link>
        <Link to="/admin/team" className="quick-link-card">
            <FiUsers className="quick-link-icon" />
            <h4>Manage Team</h4>
        </Link>
        <Link to="/admin/blogs" className="quick-link-card">
            <FiFileText className="quick-link-icon" />
            <h4>Manage Blogs</h4>
        </Link>
        <Link to="/admin/startups" className="quick-link-card">
            <FiBox className="quick-link-icon" />
            <h4>Manage Startups</h4>
        </Link>
      </div>
    </div>
  );
}

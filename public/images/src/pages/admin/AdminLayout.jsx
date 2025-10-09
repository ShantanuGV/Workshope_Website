import { NavLink } from 'react-router-dom';
import { FiGrid, FiSettings, FiCamera, FiUsers, FiBox, FiFileText, FiLogOut, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import './AdminLayout.css';
import { signOutUser } from '../../services/auth';

export function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <nav>
          <NavLink to="/admin" end>
            <FiGrid className="nav-icon" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/events">
            <FiCalendar className="nav-icon" />
            Events
          </NavLink>
          <NavLink to="/admin/team">
            <FiUsers className="nav-icon" />
            Team
          </NavLink>
          <NavLink to="/admin/blogs">
            <FiFileText className="nav-icon" />
            Blogs
          </NavLink>
          <NavLink to="/admin/startups">
            <FiBox className="nav-icon" />
            Startups
          </NavLink>
          <NavLink to="/admin/photogallery">
            <FiCamera className="nav-icon" />
            Photo Gallery
          </NavLink>
          <NavLink to="/admin/testimonials">
            <FiMessageSquare className="nav-icon" />
            Testimonials
          </NavLink>
          <NavLink to="/admin/site">
            <FiSettings className="nav-icon" />
            Site Info
          </NavLink>
        </nav>
        <div style={{padding: '20px'}}>
            <a onClick={signOutUser} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'rgba(255, 255, 255, 0.65)'}}>
                <FiLogOut className="nav-icon" />
                Logout
            </a>
        </div>
      </aside>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}

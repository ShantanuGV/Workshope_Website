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
  
  <NavLink to="/admin/certificates">
    <FiFileText className="nav-icon" />
    Certificates
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

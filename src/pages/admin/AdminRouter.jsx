import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useAuthState } from '../../services/auth.js'
import { AdminLoginPage } from './LoginPage.jsx'
import { AdminDashboard } from './Dashboard.jsx'
import { ManageEvents } from './ManageEvents.jsx'
import { ManageTeam } from './ManageTeam.jsx'
import { ManageBlogs } from './ManageBlogs.jsx'
import { ManageStartups } from './ManageStartups.jsx'
import { ManageSite } from './ManageSite.jsx'

function RequireAuth({ children }) {
  const { user, loading } = useAuthState()
  if (loading) return <p style={{ padding: 24 }}>Loading...</p>
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

export function AdminRouter() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <div className="admin-layout">
              <aside className="admin-sidebar">
                <h3>Admin</h3>
                <nav>
                  <NavLink to="/admin">Dashboard</NavLink>
                  <NavLink to="/admin/events">Events</NavLink>
                  <NavLink to="/admin/team">Team</NavLink>
                  <NavLink to="/admin/blogs">Blogs</NavLink>
                  <NavLink to="/admin/startups">Startups</NavLink>
                  <NavLink to="/admin/site">Site Info</NavLink>
                </nav>
              </aside>
              <section className="admin-content">
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="events" element={<ManageEvents />} />
                  <Route path="team" element={<ManageTeam />} />
                  <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="startups" element={<ManageStartups />} />
                  <Route path="site" element={<ManageSite />} />
                </Routes>
              </section>
            </div>
          </RequireAuth>
        }
      />
    </Routes>
  )
}



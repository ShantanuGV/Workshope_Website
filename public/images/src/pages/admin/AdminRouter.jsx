import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../../services/auth.js';
import { AdminLayout } from './AdminLayout.jsx';
import { AdminLoginPage } from './LoginPage.jsx';
import { AdminDashboard } from './Dashboard.jsx';
import { ManageEvents } from './ManageEvents.jsx';
import { ManageTeam } from './ManageTeam.jsx';
import { ManageBlogs } from './ManageBlogs.jsx';
import { ManageStartups } from './ManageStartups.jsx';
import { ManageSite } from './ManageSite.jsx';
import { ManagePhotoGallery } from './ManagePhotoGallery.jsx';

function RequireAuth({ children }) {
  const { user, loading } = useAuthState();
  if (loading) return <div className="loading-container"><p>Loading...</p></div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export function AdminRouter() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <AdminLayout>
                <Routes>
                  <Route index element={<AdminDashboard />} />
                  <Route path="events" element={<ManageEvents />} />
                  <Route path="team" element={<ManageTeam />} />
                  <Route path="blogs" element={<ManageBlogs />} />
                  <Route path="startups" element={<ManageStartups />} />
                  <Route path="photogallery" element={<ManagePhotoGallery />} />
                  <Route path="site" element={<ManageSite />} />
                </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from '../../services/auth.js';
import { AdminLayout } from './AdminLayout.jsx';
import { AdminLoginPage } from './LoginPage.jsx';
import { AdminDashboard } from './Dashboard.jsx';
import { AdminCertificates } from './AdminCertificates.jsx';


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
                  <Route path="/certificates" element={<AdminCertificates />} />
                </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

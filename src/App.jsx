import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { VisionMissionPage } from './pages/VisionMissionPage.jsx';
import { VerifyPage } from './pages/VerifyPage.jsx';
import { AdminRouter } from './pages/admin/AdminRouter.jsx';
import { Header } from './components/Layout/Header.jsx'; // Import Header
import { Footer } from './components/Layout/Footer.jsx'; // Import Footer
import Hexbg from './assets/images/Hexbg.png';
import { FiStar } from 'react-icons/fi'; // example icon
import { FaJava } from "react-icons/fa";
import './pages/admin/ManageBlogs.css';
import { AdminLoginPage } from './pages/admin/LoginPage';
import { AdminCertificates } from "./pages/admin/AdminCertificates";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  {!isAdminRoute && <Header currentPath={location.pathname} />}


  const MainLayout = ({ children }) => (
    <div className="app-container">
      {!isAdminRoute && <Header />}
      <main className="main-content">{children}</main>
      {!isAdminRoute && <Footer />}
    </div>
  );

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/admin-certificates" element={<AdminCertificates />} />
      <Route 
        path="/*" 
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vision-mission" element={<VisionMissionPage />} />
              <Route path="/loginpage" element={<AdminLoginPage />} />
              <Route path="/verifypage" element={<VerifyPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;

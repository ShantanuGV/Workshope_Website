import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { VisionMissionPage } from './pages/VisionMissionPage.jsx';
import { EventsPage } from './pages/EventsPage.jsx';
import { TeamPage } from './pages/TeamPage.jsx';
import { BlogsPage } from './pages/BlogsPage.jsx';
import { StartupsPage } from './pages/StartupsPage.jsx';
import { AdminRouter } from './pages/admin/AdminRouter.jsx';
import { BlogDetailsPage } from './pages/BlogDetailsPage.jsx';
import { PhotoGalleryPage } from './pages/PhotoGalleryPage.jsx';
import { Header } from './components/Layout/Header.jsx'; // Import Header
import { Footer } from './components/Layout/Footer.jsx'; // Import Footer
import Hexbg from './assets/images/Hexbg.png';
import './pages/admin/ManageBlogs.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
      <Route 
        path="/*" 
        element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vision-mission" element={<VisionMissionPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/startups" element={<StartupsPage />} />
              <Route path="/photogallery" element={<PhotoGalleryPage />} />
              <Route path="/blogs/:blogId" element={<BlogDetailsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;

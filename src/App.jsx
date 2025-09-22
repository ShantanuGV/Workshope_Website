import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { VisionMissionPage } from './pages/VisionMissionPage.jsx'
import { EventsPage } from './pages/EventsPage.jsx'
import { TeamPage } from './pages/TeamPage.jsx'
import { BlogsPage } from './pages/BlogsPage.jsx'
import { StartupsPage } from './pages/StartupsPage.jsx'
import { AdminRouter } from './pages/admin/AdminRouter.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<HomePage />} />
        <Route path="/vision-mission" element={<VisionMissionPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/startups" element={<StartupsPage />} />
      </Route>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

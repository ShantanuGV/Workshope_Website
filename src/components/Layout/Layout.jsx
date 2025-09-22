import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'
import { Footer } from './Footer.jsx'

export function Layout() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}



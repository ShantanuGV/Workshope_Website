import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <header className="navbar">
      <div className="container">
        <NavLink to="/" className="brand">GCOERC - Workshopes</NavLink>
        <nav>
          <NavLink to="/vision-mission">Certificate Download</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/blogs">Blogs</NavLink>
          <NavLink to="/startups">Startups</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}



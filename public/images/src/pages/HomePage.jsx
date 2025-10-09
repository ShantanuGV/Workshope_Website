import { NavLink } from 'react-router-dom';
import './HomePage.css';

export function HomePage() {
  return (
    <div className="fade-in">
      <section className="hero-section">
        <div className="hero-content slide-in-up">
        <img src="/images/Hexbg.png" alt="Test Background" style={{ width: "300px" }} />
          <h1 className="hero-title">Catalyzing Innovation, Fuelling Ambition</h1>
          <p className="hero-subtitle">The Innovation and Entrepreneurship Development Cell at [Your College Name]</p>
          <NavLink to="/events" className="btn cta-button">
            Get Involved
          </NavLink>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title slide-in-up">What We Do</h2>
        <div className="features-grid">
          <div className="card feature-card slide-in-up">
            <h3>Promote Innovation</h3>
            <p>We inspire a culture of innovation and creativity through workshops, competitions, and talks from industry leaders.</p>
          </div>
          <div className="card feature-card slide-in-up">
            <h3>Nurture Startups</h3>
            <p>We provide mentorship, resources, and networking opportunities to help students turn their ideas into successful businesses.</p>
          </div>
          <div className="card feature-card slide-in-up">
            <h3>Develop Leaders</h3>
            <p>We empower students with the skills, knowledge, and confidence to become the next generation of entrepreneurs and innovators.</p>
          </div>
        </div>
      </section>

      <section className="page-section slide-in-up">
        <div className="section-content">
            <div className="section-text">
                <h2 className="section-title">Our Startups</h2>
                <p className="section-description">Discover the innovative startups born from our ecosystem. We provide the resources and mentorship to turn bold ideas into thriving businesses.</p>
                <NavLink to="/startups" className="btn read-more-link">Learn More</NavLink>
            </div>
        </div>
      </section>

      <section className="page-section alt-section slide-in-up">
        <div className="section-content">
            <div className="section-text">
                <h2 className="section-title">Our Team</h2>
                <p className="section-description">Meet the passionate individuals driving our mission forward. Our team is a blend of experienced mentors, and student leaders.</p>
                <NavLink to="/team" className="btn read-more-link">Meet the Team</NavLink>
            </div>
        </div>
      </section>

      <section className="page-section slide-in-up">
        <div className="section-content">
            <div className="section-text">
                <h2 className="section-title">Events</h2>
                <p className="section-description">From ideation workshops to pitch competitions, our events are designed to inspire, educate, and connect the next generation of innovators.</p>
                <NavLink to="/events" className="btn read-more-link">Explore Events</NavLink>
            </div>
        </div>
      </section>

      <section className="page-section alt-section slide-in-up">
        <div className="section-content">
            <div className="section-text">
                <h2 className="section-title">Our Blog</h2>
                <p className="section-description">Read the latest stories of innovation, success, and entrepreneurship from our community. Get insights, tips, and inspiration for your own journey.</p>
                <NavLink to="/blogs" className="btn read-more-link">Read the Blog</NavLink>
            </div>
        </div>
      </section>

      <section className="cta-section">
          <div className="cta-content slide-in-up">
              <h2 className="cta-title">Ready to Innovate?</h2>
              <p className="cta-subtitle">Join our community and start your entrepreneurial journey today.</p>
              <NavLink to="/events" className="btn cta-button">Get Involved</NavLink>
          </div>
      </section>
    </div>
  );
}

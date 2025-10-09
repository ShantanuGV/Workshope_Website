import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listBlogs } from '../services/blogs.js';
import { FiArrowRight } from 'react-icons/fi';
import './BlogsPage.css';

export function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    listBlogs().then(blogs => {
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(blogs);
    });
  }, []);

  return (
    <section className="blogs-page fade-in">
      <h1 className="page-title slide-in-up">Our Blog</h1>
      {blogs.length === 0 ? (
        <div className="no-events-message slide-in-up">
            <p>No blog posts yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((b) => (
            <Link to={`/blogs/${b.id}`} key={b.id} className="card blog-card slide-in-up">
                {b.mainImage && 
                    <div className="blog-card-image-container">
                        <img src={b.mainImage} alt={b.title} className="blog-card-image" />
                    </div>
                }
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{b.title}</h3>
                  <p className="blog-card-excerpt">{b.excerpt || b.content?.slice(0, 150) + '...'}</p>
                  <div className="blog-card-footer">
                    <span className="read-more-link">
                        Read More
                        <FiArrowRight className="read-more-icon"/>
                    </span>
                    <p className="blog-date">{new Date(b.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

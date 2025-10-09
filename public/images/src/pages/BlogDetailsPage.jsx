import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlog, addComment } from '../services/blogs.js';
import { FiCalendar, FiEye, FiArrowLeft } from 'react-icons/fi';
import './BlogDetailsPage.css';

export function BlogDetailsPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    getBlog(blogId).then(blogData => {
      if (blogData) {
        setBlog({
          ...blogData,
          comments: blogData.comments || []
        });
      }
    });
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;

    const newComment = {
      text: comment,
      createdAt: new Date().toISOString()
    };

    await addComment(blogId, newComment);
    setBlog(prevBlog => ({
      ...prevBlog,
      comments: [...prevBlog.comments, newComment]
    }));
    setComment('');
  };

  if (!blog) {
    return <div className="loading-container"><p>Loading blog post...</p></div>;
  }

  return (
    <div className="blog-details-page fade-in">
      <Link to="/blogs" className="btn read-more-link back-link slide-in-up">
        <FiArrowLeft className="read-more-icon"/>
        Back to Blogs
      </Link>

      <article className="card blog-post slide-in-up">
        {blog.mainImage && <img src={blog.mainImage} alt={blog.title} className="blog-main-image" />}
        
        <h1 className="blog-title">{blog.title}</h1>
        <div className="blog-meta">
            <div className="blog-meta-item">
                <FiCalendar className="meta-icon"/>
                <p className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="blog-meta-item">
                <FiEye className="meta-icon"/>
                <p className="blog-views">{blog.views} views</p>
            </div>
        </div>
        
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>

      <div className="card comments-section slide-in-up">
        <h2 className="comments-title">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            rows="4"
          />
          <button type="submit" className="btn cta-button">Submit Comment</button>
        </form>
        <div className="comment-list">
          {blog.comments.length > 0 ? (
            blog.comments.map((c, index) => (
              <div key={index} className="comment-item">
                <p className="comment-text">{c.text}</p>
                <small className="comment-meta">{new Date(c.createdAt).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

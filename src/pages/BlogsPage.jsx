import { useEffect, useState } from 'react'
import { listBlogs } from '../services/blogs.js'

export function BlogsPage() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    listBlogs().then(setBlogs)
  }, [])

  return (
    <section className="container">
      <h2>Blogs</h2>
      {blogs.length === 0 && <p>No blog posts yet.</p>}
      <div className="grid">
        {blogs.map((b) => (
          <article key={b.id} className="card">
            <h3>{b.title}</h3>
            <p>{b.excerpt || b.content?.slice(0, 160)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}



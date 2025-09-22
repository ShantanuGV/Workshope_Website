import { useEffect, useState } from 'react'
import { createBlog, deleteBlog, listBlogs } from '../../services/blogs.js'

export function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function refresh() {
    const data = await listBlogs()
    setBlogs(data)
  }

  useEffect(() => { refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createBlog({ title, content })
    setTitle(''); setContent('')
    refresh()
  }

  return (
    <div>
      <h3>Manage Blogs</h3>
      <form onSubmit={onCreate} className="form">
        <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {blogs.map(b => (
          <li key={b.id}>
            <strong>{b.title}</strong>
            <button onClick={()=>{ deleteBlog(b.id).then(refresh) }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}



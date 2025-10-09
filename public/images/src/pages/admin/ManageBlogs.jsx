import { useEffect, useState } from 'react';
import { createBlog, deleteBlog, listBlogs, updateBlog } from '../../services/blogs.js';
import { FaEdit, FaTimes, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ManagePageLayout } from './ManagePageLayout.jsx';

export function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState('');
  const [editingBlog, setEditingBlog] = useState(null);

  async function refresh() {
    const data = await listBlogs();
    setBlogs(data);
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const imagesArray = images.split(',').map(url => url.trim()).filter(url => url);
    if (editingBlog) {
      await updateBlog(editingBlog.id, { title, content, mainImage, images: imagesArray });
      setEditingBlog(null);
    } else {
      await createBlog({ title, content, mainImage, images: imagesArray });
    }
    setTitle(''); setContent(''); setMainImage(''); setImages('');
    refresh();
  }

  function onEdit(blog) {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setMainImage(blog.mainImage);
    setImages(blog.images.join(', '));
  }

  function onCancelEdit() {
    setEditingBlog(null);
    setTitle('');
    setContent('');
    setMainImage('');
    setImages('');
  }

  async function move(index, direction) {
    const newBlogs = [...blogs];
    const [blog] = newBlogs.splice(index, 1);
    newBlogs.splice(index + direction, 0, blog);

    for (let i = 0; i < newBlogs.length; i++) {
      if (newBlogs[i].order !== i) {
        await updateBlog(newBlogs[i].id, { order: i });
      }
    }
    refresh();
  }

  return (
    <ManagePageLayout title="Manage Blogs">
      <table className="manage-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b, i) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td className="manage-table-actions">
                <button className='btn-icon' onClick={() => onEdit(b)}><FaEdit /></button>
                {i > 0 && <button className='btn-icon' onClick={() => { move(i, -1); }}><FaArrowUp /></button>}
                {i < blogs.length - 1 && <button className='btn-icon' onClick={() => { move(i, 1); }}><FaArrowDown /></button>}
                <button className='btn-icon btn-danger' onClick={() => { deleteBlog(b.id).then(refresh); }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h3>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h3>
        <form onSubmit={onSubmit} className="form">
            <div className="form-row">
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input placeholder="Main Image URL" value={mainImage} onChange={(e) => setMainImage(e.target.value)} />
            </div>
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={5}/>
            <textarea placeholder="Comma-separated image URLs for gallery" value={images} onChange={(e) => setImages(e.target.value)} rows={3}/>
            {editingBlog ? (
                <div className="form-actions">
                <button type="submit" className="btn">Update</button>
                <button type="button" className="btn btn-secondary" onClick={onCancelEdit}><FaTimes /></button>
                </div>
            ) : (
                <button type="submit" className="btn">Add Blog</button>
            )}
        </form>
      </div>
    </ManagePageLayout>
  );
}

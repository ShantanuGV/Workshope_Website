import { useEffect, useState } from 'react';
import { createPhoto, deletePhoto, listPhotos, updatePhoto } from '../../services/photoGallery.js';
import { FaArrowUp, FaArrowDown, FaEdit, FaTimes } from 'react-icons/fa';

const IMAGEBB_API_KEY = 'e72d08546cf21bd22b8dfca276ba6c9e';

export function ManagePhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    const data = await listPhotos();
    setPhotos(data);
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = editingPhoto ? editingPhoto.imageUrl : '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${IMAGEBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      imageUrl = data.data.url;
    }

    const photoData = { title, description, imageUrl };

    if (editingPhoto) {
      await updatePhoto(editingPhoto.id, photoData);
      setEditingPhoto(null);
    } else {
      await createPhoto(photoData);
    }

    setTitle('');
    setDescription('');
    setImageFile(null);
    setUploading(false);
    refresh();
  }

  function onEdit(photo) {
    setEditingPhoto(photo);
    setTitle(photo.title);
    setDescription(photo.description);
  }

  function onCancelEdit() {
    setEditingPhoto(null);
    setTitle('');
    setDescription('');
    setImageFile(null);
  }

  async function move(index, direction) {
    const newPhotos = [...photos];
    const [photo] = newPhotos.splice(index, 1);
    newPhotos.splice(index + direction, 0, photo);

    for (let i = 0; i < newPhotos.length; i++) {
      if (newPhotos[i].order !== i) {
        await updatePhoto(newPhotos[i].id, { order: i });
      }
    }
    refresh();
  }

  return (
    <div>
      <h3>{editingPhoto ? 'Edit' : 'Manage'} Photo Gallery</h3>
      <form onSubmit={onSubmit} className="form">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        {editingPhoto ? (
          <div>
            <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Update'}</button>
            <button type="button" onClick={onCancelEdit}><FaTimes /></button>
          </div>
        ) : (
          <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Add'}</button>
        )}
      </form>
      <ul className="manage-list">
        {photos.map((photo, i) => (
          <li key={photo.id}>
            <span>
              <img src={photo.imageUrl} alt={photo.title} width="100" />
              <strong>{photo.title}</strong>
            </span>
            <span className="manage-list-buttons">
              <button onClick={() => onEdit(photo)}><FaEdit /></button>
              {i > 0 && <button onClick={() => { move(i, -1); }}><FaArrowUp /></button>}
              {i < photos.length - 1 && <button onClick={() => { move(i, 1); }}><FaArrowDown /></button>}
              <button onClick={() => { deletePhoto(photo.id).then(refresh); }}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

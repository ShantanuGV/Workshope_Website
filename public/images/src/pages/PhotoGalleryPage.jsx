import { useEffect, useState } from 'react';
import { listPhotos } from '../services/photoGallery.js';
import './PhotoGalleryPage.css';

export function PhotoGalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    listPhotos().then(setPhotos);
  }, []);

  return (
    <section className="photo-gallery-page fade-in">
      <h1 className="page-title slide-in-up">Photo Gallery</h1>
      
      {photos.length > 0 ? (
        <div className="photo-grid">
            {photos.map(photo => (
            <div key={photo.id} className="card photo-card slide-in-up" onClick={() => setSelectedPhoto(photo)}>
                <img src={photo.imageUrl} alt={photo.title} className="photo-card-image"/>
                <div className="photo-card-overlay">
                <h3 className="photo-card-title">{photo.title}</h3>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="no-events-message slide-in-up">
            <p>No photos to display.</p>
        </div>
      )}

      {selectedPhoto && (
        <div className="fullscreen-overlay fade-in" onClick={() => setSelectedPhoto(null)}>
          <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} className="fullscreen-image"/>
        </div>
      )}
    </section>
  );
}

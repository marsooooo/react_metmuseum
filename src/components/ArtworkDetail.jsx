export default function ArtworkDetail({ artwork, isFavorite, onToggleFavorite, onClose }) {
  if (!artwork) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {artwork.primaryImage ? (
          <img src={artwork.primaryImage} alt={artwork.title} />
        ) : (
          <div style={{ height: 200, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
            Pas d'image disponible
          </div>
        )}

        <div className="modal-body">
          <div className="modal-title">{artwork.title}</div>
          {artwork.artistDisplayName && (
            <div className="modal-artist">
              {artwork.artistDisplayName}
              {artwork.artistDisplayBio && ` — ${artwork.artistDisplayBio}`}
            </div>
          )}

          <div className="modal-meta">
            {artwork.objectDate && <><span>Date</span><strong>{artwork.objectDate}</strong></>}
            {artwork.medium && <><span>Technique</span><strong>{artwork.medium}</strong></>}
            {artwork.department && <><span>Département</span><strong>{artwork.department}</strong></>}
            {artwork.classification && <><span>Classification</span><strong>{artwork.classification}</strong></>}
            {artwork.culture && <><span>Culture</span><strong>{artwork.culture}</strong></>}
            {artwork.dimensions && <><span>Dimensions</span><strong>{artwork.dimensions}</strong></>}
            {artwork.creditLine && <><span>Crédit</span><strong>{artwork.creditLine}</strong></>}
            {artwork.GalleryNumber && <><span>Galerie</span><strong>{artwork.GalleryNumber}</strong></>}
          </div>

          <div className="modal-actions">
            <button
              className={`btn-fav ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(artwork)}
            >
              {isFavorite ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris'}
            </button>
            {artwork.objectURL && (
              <a href={artwork.objectURL} target="_blank" rel="noreferrer">
                Voir sur metmuseum.org →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

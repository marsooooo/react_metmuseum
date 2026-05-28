import { useState, useEffect } from 'react'

const API = 'https://collectionapi.metmuseum.org/public/collection/v1'

export default function ArtworkCard({ id, isFavorite, onToggleFavorite, onSelect }) {
  const [artwork, setArtwork] = useState(null)

  useEffect(() => {
    fetch(`${API}/objects/${id}`)
      .then(r => r.json())
      .then(data => setArtwork(data))
  }, [id])

  if (!artwork) {
    return (
      <div className="card">
        <div className="no-img">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="card" onClick={() => onSelect(artwork)}>
      {artwork.primaryImageSmall ? (
        <img src={artwork.primaryImageSmall} alt={artwork.title} loading="lazy" />
      ) : (
        <div className="no-img">Pas d'image</div>
      )}
      <div className="card-body">
        <div className="card-title">{artwork.title}</div>
        <div className="card-sub">{artwork.artistDisplayName || artwork.culture || ''}</div>
      </div>
      <button
        className="fav-btn"
        onClick={e => { e.stopPropagation(); onToggleFavorite(artwork) }}
        title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </div>
  )
}

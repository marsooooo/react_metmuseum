import { useState } from 'react'
import SearchForm from './components/SearchForm'
import ArtworkCard from './components/ArtworkCard'
import ArtworkDetail from './components/ArtworkDetail'
import { useFavorites } from './hooks/useFavorites'

const API = 'https://collectionapi.metmuseum.org/public/collection/v1'
const PAGE_SIZE = 20

export default function App() {
  const [view, setView] = useState('search')
  const [objectIds, setObjectIds] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  async function handleSearch(params) {
    setLoading(true)
    setPage(1)

    const url = new URL(`${API}/search`)
    url.searchParams.set('q', params.q)
    if (params.hasImages) url.searchParams.set('hasImages', 'true')
    if (params.isHighlight) url.searchParams.set('isHighlight', 'true')
    if (params.isOnView) url.searchParams.set('isOnView', 'true')
    if (params.departmentId) url.searchParams.set('departmentId', params.departmentId)

    const res = await fetch(url)
    const data = await res.json()

    setObjectIds(data.objectIDs || [])
    setTotal(data.total || 0)
    setLoading(false)
    setView('search')
  }

  const visibleIds = objectIds.slice(0, page * PAGE_SIZE)

  return (
    <>
      <header>
        <h1>MET Museum</h1>
        <nav>
          <button className={view === 'search' ? 'active' : ''} onClick={() => setView('search')}>
            Recherche
          </button>
          <button className={view === 'favorites' ? 'active' : ''} onClick={() => setView('favorites')}>
            Favoris ({favorites.length})
          </button>
        </nav>
      </header>

      <div className="container">
        {view === 'search' && (
          <>
            <SearchForm onSearch={handleSearch} />

            {loading && <div className="loading">Recherche en cours...</div>}

            {!loading && total > 0 && (
              <div className="results-info">{total} résultats trouvés</div>
            )}

            {!loading && objectIds.length === 0 && (
              <div className="empty">Lancez une recherche pour découvrir des oeuvres.</div>
            )}

            <div className="grid">
              {visibleIds.map(id => (
                <ArtworkCard
                  key={id}
                  id={id}
                  isFavorite={isFavorite(id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedArtwork}
                />
              ))}
            </div>

            {visibleIds.length < objectIds.length && (
              <div className="load-more">
                <button onClick={() => setPage(p => p + 1)}>
                  Voir plus ({visibleIds.length} / {objectIds.length})
                </button>
              </div>
            )}
          </>
        )}

        {view === 'favorites' && (
          <>
            {favorites.length === 0 ? (
              <div className="empty">Aucun favori pour l'instant.</div>
            ) : (
              <div className="grid">
                {favorites.map(artwork => (
                  <ArtworkCard
                    key={artwork.objectID}
                    id={artwork.objectID}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    onSelect={setSelectedArtwork}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ArtworkDetail
        artwork={selectedArtwork}
        isFavorite={selectedArtwork ? isFavorite(selectedArtwork.objectID) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  )
}

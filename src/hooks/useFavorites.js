import { useState } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('met-favorites')
    return saved ? JSON.parse(saved) : []
  })

  function toggleFavorite(artwork) {
    setFavorites(prev => {
      const exists = prev.find(a => a.objectID === artwork.objectID)
      const next = exists
        ? prev.filter(a => a.objectID !== artwork.objectID)
        : [...prev, artwork]
      localStorage.setItem('met-favorites', JSON.stringify(next))
      return next
    })
  }

  function isFavorite(id) {
    return favorites.some(a => a.objectID === id)
  }

  return { favorites, toggleFavorite, isFavorite }
}

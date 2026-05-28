import { useState, useEffect } from 'react'

const API = 'https://collectionapi.metmuseum.org/public/collection/v1'

export default function SearchForm({ onSearch }) {
  const [q, setQ] = useState('')
  const [hasImages, setHasImages] = useState(false)
  const [isHighlight, setIsHighlight] = useState(false)
  const [isOnView, setIsOnView] = useState(false)
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    fetch(`${API}/departments`)
      .then(r => r.json())
      .then(data => setDepartments(data.departments))
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!q.trim()) return
    onSearch({ q: q.trim(), hasImages, isHighlight, isOnView, departmentId })
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher une oeuvre..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <select value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
        <option value="">Tous les départements</option>
        {departments.map(d => (
          <option key={d.departmentId} value={d.departmentId}>{d.displayName}</option>
        ))}
      </select>
      <label>
        <input type="checkbox" checked={hasImages} onChange={e => setHasImages(e.target.checked)} />
        Avec image
      </label>
      <label>
        <input type="checkbox" checked={isHighlight} onChange={e => setIsHighlight(e.target.checked)} />
        Highlights
      </label>
      <label>
        <input type="checkbox" checked={isOnView} onChange={e => setIsOnView(e.target.checked)} />
        En exposition
      </label>
      <button type="submit">Rechercher</button>
    </form>
  )
}

import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import PokemonCard from './PokemonCard'
import SearchBar from './SearchBar'

const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'

export default function Pokedex() {
  const { data, loading, error } = useFetch(LIST_URL)
  const [pokemonList, setPokemonList] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!data?.results) return
    // fetch details for all 151 (Promise.all)
    let cancelled = false
    async function fetchAll() {
      try {
        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        )
        if (!cancelled) setPokemonList(details)
      } catch (e) {
        console.error(e)
      }
    }
    fetchAll()
    return () => { cancelled = true }
  }, [data])

  function matches(p, q) {
    if (!q) return true
    const lc = q.toLowerCase()
    if (p.name.toLowerCase().includes(lc)) return true
    if (p.types?.some((t) => t.type.name.includes(lc))) return true
    return false
  }

  const visible = pokemonList.filter((p) => matches(p, query))

  return (
    <section className="pokedex">
      <h2>Pokédex</h2>
      <SearchBar value={query} onChange={setQuery} placeholder="Search by name or type" />

      {loading && <p>Loading list...</p>}
      {error && <p className="error">Error loading list: {error.message}</p>}

      <div className="grid">
        {visible.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  )
}
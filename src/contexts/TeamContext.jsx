import React, { createContext, useContext, useState, useEffect } from 'react'

const TeamContext = createContext()

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => {
    try {
      const raw = localStorage.getItem('pokemon-team')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('pokemon-team', JSON.stringify(team))
  }, [team])

  function addPokemon(p) {
    setTeam((t) => {
      if (t.find((x) => x.id === p.id)) return t
      if (t.length >= 6) return t
      return [...t, p]
    })
  }

  function removePokemon(id) {
    setTeam((t) => t.filter((p) => p.id !== id))
  }

  const value = { team, addPokemon, removePokemon }

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}

export function useTeam() {
  return useContext(TeamContext)
}
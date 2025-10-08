import React from 'react'
import { useTeam } from '../contexts/TeamContext'

export default function PokemonCard({ pokemon }) {
  const { team, addPokemon } = useTeam()
  const inTeam = team.some((p) => p.id === pokemon.id)
  const teamFull = team.length >= 6

  const img = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default

  return (
    <div className="card">
      <img src={img} alt={pokemon.name} className="sprite" />
      <div className="card-body">
        <h3>{pokemon.name}</h3>
        <p className="types">{pokemon.types.map((t) => t.type.name).join(', ')}</p>
        <div className="actions">
          <button
            onClick={() => addPokemon({ id: pokemon.id, name: pokemon.name, sprite: img, types: pokemon.types })}
            disabled={inTeam || teamFull}
          >
            {inTeam ? 'In Team' : teamFull ? 'Team Full' : 'Add to Team'}
          </button>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { useTeam } from '../contexts/TeamContext'

export default function TeamView() {
  const { team, removePokemon } = useTeam()

  const emptySlots = Array.from({ length: 6 - team.length })

  return (
    <aside className="teamview">
      <h2>Your Team</h2>
      <div className="team-grid">
        {team.map((p) => (
          <div key={p.id} className="team-slot" onClick={() => removePokemon(p.id)} title="Click to remove">
            <img src={p.sprite} alt={p.name} />
            <div className="slot-name">{p.name}</div>
          </div>
        ))}

        {emptySlots.map((_, i) => (
          <div key={`empty-${i}`} className="team-slot empty">
            <div className="slot-name">Empty</div>
          </div>
        ))}
      </div>
      <p className="hint">Click a Pokémon to remove it. Team saved automatically.</p>
    </aside>
  )
}
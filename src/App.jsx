import React from 'react'
import Pokedex from './components/Pokedex'
import TeamView from './components/TeamView'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Pokémon Team Builder</h1>
      </header>
      <main className="container">
        <Pokedex />
        <TeamView />
      </main>
      <footer className="footer">Built with PokéAPI</footer>
    </div>
  )
}
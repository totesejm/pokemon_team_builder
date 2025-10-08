import React from 'react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="searchbar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="search"
      />
    </div>
  )
}
import React from 'react'
import { useState } from 'react'

const SearchBar = ({ q, onSearchChange }) => {



    return (
        <>
            <div className='search-bar flex items-center m-2 relative '>
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    value={q}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search trails by name or region..."
                    className="w-[30vw] pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        </>
    )
}

export default SearchBar
'use client'
import React, { useEffect, useState } from 'react'

const Search = () => {

  const [query, setQuery] = useState('')

  return (
    <div className='p-4 bg-violet-700 inline-block rounded-xl'>
      <input 
        type='text' 
        value={query}
        onChange={(e)=>{
          setQuery(e.target.value)
        }}
        placeholder='Cerca'
        className='pl-2 rounded-xl'
      />
    </div>
  )
}

export default Search
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import searchIcon from '@/icons/search.svg'

const Search = () => {

  const router = useRouter()

  const aParam = useSearchParams().get('a') ?? ''
  const [query, setQuery] = useState(aParam)

  useEffect(() => {
    if(query.includes('\n')) {
      setQuery(() => {
        return query.replace('\n', '')
      })
      //@ts-expect-error
      const form: HTMLFormElement = document.querySelector('#theSearchForm')
      form.submit()
    }
  }, [query])

  const handleSubmit = ()=>{
    if(query==='') {
      router.replace('/buy')
    } else {
      router.replace(`/buy?a=${query.replaceAll(' ', '+')}`)
    }
  }

  return (
    <form 
      className='px-4 py-3 bg-violet-700 w-80 h-14 rounded-xl flex items-center'
      onSubmit={(e)=>{
        e.preventDefault()
        handleSubmit()
      }}
      id='theSearchForm'
    >
      <input 
        type='text' 
        value={query}
        onChange={(e)=>{
          setQuery(e.target.value)
        }}
        placeholder='Cerca'
        className='pl-2 rounded-l-xl w-full h-full'
      />
      <button
        type='submit'
        className=' bg-slate-200 h-full px-3 rounded-r-xl'
      >
        <Image
          src={searchIcon}
          alt='search icon'
          draggable='false'
        />
      </button>
    </form>
  )
}

export default Search
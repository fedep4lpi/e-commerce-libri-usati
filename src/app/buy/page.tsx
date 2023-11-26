'use client'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [query, setQuery] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('inside')
    const fetchData = async () => {
      const response = await fetch(
        '/api/shop', {
          method: 'POST',
          body: JSON.stringify({
            query: query
          })
        }
      )
      const body = await response.json()
      if(response.status===200){
        setData(body.data)
      } else {
        console.log(body.err)
      }
    }
    fetchData()
  }, [query])

  return (
    <main className='p-10'>
      <div className='bg-violet-700 p-4 inline-block mb-5 rounded-lg'>
        <input 
          type="text" 
          onChange={(e)=>{
            setQuery(e.target.value)
          }}
          placeholder='Cerca'
          className='pl-2 rounded-lg'
        />
      </div>
      {data.map((bookData, idx)=>{
        return (
          <p key={idx}>
            {JSON.stringify(bookData)}
          </p>
        )
      })}
    </main>
  )
}

export default page
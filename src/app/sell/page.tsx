'use client'

import React, { useState } from 'react'

const Sell = () => {

  const [file, setFile] = useState<File>()
  const [isbn, setIsbn] = useState<string>()
  const [price, setPrice] = useState<number>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    try {

      e.preventDefault()

      if (!file) return

      const data = new FormData()
      data.set('file', file)
      data.append('json', JSON.stringify({
        isbn: isbn,
        price: price
      }))

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      // handle the error
      if (!res.ok) throw new Error(await res.text())
      
    } catch (e: any) {

      // Handle errors here
      console.error(e)

    } finally {
      // @ts-ignore
      e.target.reset()
    }
  }

  return (
    <main className='w-full h-full flex justify-center items-center'>
      <form 
        onSubmit={onSubmit}
        className='w-1/3 flex justify-center items-center flex-col p-6 bg-violet-800 rounded-xl'
      >
        <input
          type="file"
          accept='.png,.jpg,.jpeg,.heic,.webp'
          name="file"
          id='fileInput'
          onChange={(e) => setFile(e.target.files?.[0])}
          className='w-full m-5 text-white'
          required
        />
        <input 
          type="text" 
          name="isbn"
          onChange={(e) => setIsbn(e.target.value)}
          className='w-full pl-2 h-10 rounded-t-sm mb-[0.5px]'
          placeholder='isbn'
          required
          minLength={13}
          maxLength={13}
        />
        <input 
          type="number" 
          name="price"
          onChange={(e) => setPrice(Number(e.target.value))}
          className='w-full pl-2 h-10 rounded-b-sm'
          placeholder='prezzo'
          required
        />
        <button type='submit' className='block btn m-5'>
          Invia
        </button>
      </form>
    </main>
  )
}

export default Sell
'use client'

import React, { useState } from 'react'

const Sell = () => {

  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    try {

      e.preventDefault()

      console.log(1)

      if (!file) return

      console.log(2)

      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })

      console.log(3)

      // handle the error
      if (!res.ok) throw new Error(await res.text())
      
    } catch (e: any) {

      // Handle errors here
      console.error(e)

    } finally {
      // @ts-ignore
      document.querySelector('#fileInput').value = null
    }
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept='.png,.jpg,.jpeg,.heic,.webp'
          name="file"
          id='fileInput'
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type='submit'>Invia</button>
      </form>
    </main>
  )
}

export default Sell
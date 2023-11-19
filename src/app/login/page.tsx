'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const login = () => {

  const [isLogged, setIsLogged] = useState()

  

  const handleSubmit = async () => {
    const data = await fetch('/')
  }

  return (
    <main className='w-full h-full flex justify-center items-center'>
      <form 
        onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}
        className=' w-80 flex flex-col justify-center'
      >
        <h2 className=' text-5xl mb-5 text-center'>
          LOGIN
        </h2>
        <input 
          type='email'
          name='email'
          placeholder='email'
          className='h-10 pl-2 rounded-t-md'  
        />
        <input 
          type='password'
          name='password'
          placeholder='password' 
          className='h-10 pl-2 rounded-b-md'
        />
        <p className='mt-5 pl-2'>
          Non sei ancora registrato? 
          <Link 
            href='/signup'
            className=' text-blue-700 pl-1'
          >
            Registrati
          </Link>
        </p>
        <div className='flex justify-center'>
          <button 
            type='submit'
            className=' btn mt-5 w-3/5'
          >
            Accedi
          </button>
        </div>
      </form>
    </main>
  )
}

export default login
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    if(data.status === 200) {
      localStorage.setItem('email', email)
      setEmail('')
      setPassword('')
      location.replace('/buy')
    }

    const response = await data.json()

    console.log(response)
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
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
          className='h-10 pl-2 rounded-t-md'  
        />
        <input 
          type='password'
          name='password'
          placeholder='password' 
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          className='h-10 pl-2 rounded-b-md'
        />
        <p className='mt-5 text-center'>
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

export default Login
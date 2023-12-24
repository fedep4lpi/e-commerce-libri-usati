'use client'
import React from 'react'

const page = () => {

  const logout = async () => {
    const response = await fetch('/api/auth/logout')
    if(response.status===200) {
      window.localStorage.clear()
      location.replace('/')
    }
  }

  return (
    <main className='w-full h-full flex justify-center items-center flex-col'>
      <div className='w-1/3 h-1/2'>
        <h2 className=' text-6xl'>
          ACCOUNT
        </h2>
        <p>
          email: {window.localStorage.getItem('email')}
        </p>
        <button 
          onClick={()=>{
            logout()
          }}
          className='btn'
        >
          logout
        </button>
      </div>
    </main>
  )
}

export default page
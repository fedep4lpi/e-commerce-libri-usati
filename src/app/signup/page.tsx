'use client'
import React from 'react'

const signup = () => {
  return (
    <main className=' w-full h-full flex justify-center items-center text-white'>
        <form className=' flex flex-col space-y-5 w-[500px] bg-violet-600 p-10 rounded-xl'>
            <h2 className=' text-5xl mb-5 text-center'>
                REGISTRATI
            </h2>
            <div>
                <label htmlFor='email'>
                    email:
                </label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className=' float-right'
                />
            </div>
            <div>
                <label htmlFor='password1'>
                    password:
                </label>
                <input 
                    type='password1'
                    name='password1'
                    id='password1'
                    className=' float-right'
                />
            </div>
            <div>
                <label htmlFor='password2'>
                    conferma password:
                </label>
                <input 
                    type='password2'
                    name='password2'
                    id='password2'
                    className=' float-right'
                />
            </div>
            <button className='btn'>
                Registrati
            </button>
        </form>
    </main>
  )
}

export default signup
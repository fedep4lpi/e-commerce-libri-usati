'use client'
import React, { useEffect, useState } from 'react'

const pNotEqualPass = (passErr: boolean) => {
    if(passErr) {
        return (
            <p className=' text-red-500 bg-white text-center mt-5'>
                Le 2 password non coincidono!
            </p>
        )
    }
}

const Signup = () => {

    const [email, setEmail] = useState('')

    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [password, setPassword] = useState('')

    const [passErr, setPassErr] = useState(false)

    useEffect(()=>{
        if(password1===password2) {
            setPassErr(false)
            setPassword(password1)
        } else {
            setPassErr(true)
        }
    }, [password1, password2])

    const handleSubmit = async () => {
        
        const data = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const response = await data.json()
        console.log(response)
    }

    return (
        <main className=' w-full h-full flex justify-center items-center text-white'>
            <form 
                onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmit()
                }}
                className=' flex flex-col space-y-5 w-[500px] bg-violet-600 p-10 rounded-xl'
            >
                <h2 className=' text-5xl text-center'>
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
                        onChange={(e)=>{
                            setEmail(e.target.value)
                          }}
                        className=' float-right'
                    />
                </div>
                <div>
                    <label htmlFor='password1'>
                        password:
                    </label>
                    <input 
                        type='password'
                        name='password1'
                        id='password1'
                        onChange={(e)=>{
                            setPassword1(e.target.value)
                        }}
                        className=' float-right'
                    />
                </div>
                <div>
                    <label htmlFor='password2'>
                        conferma password:
                    </label>
                    <input
                        type='password'
                        name='password2'
                        id='password2'
                        onChange={(e)=>{
                            setPassword2(e.target.value)
                        }}
                        className=' float-right'
                    />
                    {pNotEqualPass(passErr)}
                </div>
                <button className='btn'>
                    Registrati
                </button>
            </form>
        </main>
    )
}

export default Signup
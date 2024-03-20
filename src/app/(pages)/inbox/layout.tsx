'use client'
import { useEffect, useState } from 'react'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  
  const [ contacts, setContacts ] = useState([])
  
  const fetchContacts = async () => {
    try {
      const response = await (await fetch('/api/messages/getcontacts')).json()
      setContacts(response.contacts)
    } 
    catch(err) {
      console.log(err)
    }
  }

  useEffect(()=>{fetchContacts()}, [])

  return (
    <main>
      <ul className=' w-80'>
        { contacts.map(({ contact }, idx) => {
          return (
            <li 
              key={idx}
              className=' p-10 bg-violet-200 hover:bg-violet-400 cursor-pointer border-b-2 border-white overflow-x-hidden'
            >
              { contact }
            </li>
          )
        }) }
      </ul>
      { children }
    </main>
  )  
}

export default RootLayout
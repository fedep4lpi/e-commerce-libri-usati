'use client'
import Link from 'next/link'
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
    <div className=' h-full flex'>
      <ul className=' w-80 h-full'>
        { contacts.map(({ contact }, idx) => {
          return (
            <Link
              key={idx}
              href={`/inbox/${contact}`}
            >
              <li className=' p-10 bg-violet-200 hover:bg-violet-400 cursor-pointer border-b-2 border-white overflow-x-hidden'>
                { contact }
              </li>
            </Link>
          )
        }) }
      </ul>
      { children }
    </div>
  )  
}

export default RootLayout
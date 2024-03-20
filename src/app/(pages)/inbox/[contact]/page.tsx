'use client'
import { useEffect, useState } from "react"
import { decode } from "urlencode"

export default function Page({ 
  params 
}: { 
  params: { contact: string } 
}) {

  params.contact = decode(params.contact)

  const [ messages, setMessages ] = useState()

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages/getmessages', {
        method: 'POST',
        body: JSON.stringify({
          contact: params.contact
        })
      })
      const data = (await res.json()).messages
      setMessages(data)
    } catch(err) {
      console.log(err)
    }
  }  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{fetchMessages()}, [])

  return (
    <main>
      {String()}
    </main>   
  )
}
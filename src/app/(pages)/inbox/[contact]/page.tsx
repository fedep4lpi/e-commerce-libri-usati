'use client'
import { useEffect, useState } from "react"
import { decode } from "urlencode"
import { MessageType } from './types'
import Message from "./message"

export default function Page({ 
  params 
}: { 
  params: { contact: string } 
}) {

  params.contact = decode(params.contact)

  const [ messages, setMessages ] = useState<Array<MessageType>>([])

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
    <main className=" w-full h-full py-10 px-40 flex flex-col justify-between">
      <div>
        {
          //@ts-ignore
          messages.map((mess, idx) => {
            return (
              <Message key={idx} {...mess}/>
            )
          })
        }
      </div>
      <div className="  p-6 w-full bg-violet-700 rounded-lg">
        <input type="text" className=" w-full rounded-lg h-8 pl-2"/>
      </div>
    </main>   
  )
}
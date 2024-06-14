'use client'
import { useEffect, useState, useRef } from "react"
import { decode } from "urlencode"
import { MessageType } from './types'
import Message from "./message"
import Image from 'next/image'
import sendIcon from "../../../../icons/send.svg"
import useAutosizeTextArea from "./useAutosizeTextArea"

export default function Page({ 
  params 
}: { 
  params: { contact: string } 
}) {

  params.contact = decode(params.contact)

  const [ messages, setMessages ] = useState<Array<MessageType>>([])
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    setValue(val);
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/messages/sendmessage', {
        method: 'POST',
        body: JSON.stringify({
          receiver: params.contact,
          content: value
        })
      })
      console.log(res)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=>{

    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/messages/getmessages', {
          method: 'POST',
          body: JSON.stringify({
            contact: params.contact
          })
        })
        console.log(res)
        const data = (await res.json()).messages
        setMessages(data.reverse())
      } catch(err) {
        console.log(err)
      }
    }  

    const fetchTimeout = setTimeout(fetchMessages, 600)
    return () => clearTimeout(fetchTimeout)
  }, 
  [messages, params.contact])

  return (
    <main className=" w-full h-full py-10 px-40 flex flex-col justify-between">
      <div
        className=" w-full h-full overflow-y-scroll my-8 pr-3 first:mt-0 flex flex-col-reverse"
      >
        {
          //@ts-ignore
          messages.map((mess, idx) => {
            return (
              <Message key={idx} {...mess}/>
            )
          })
        }
      </div>
      <div className="  p-6 w-full bg-violet-700 rounded-lg flex">
        <textarea
          id="review-text"
          onChange={handleChange}
          placeholder="Enter the message"
          ref={textAreaRef}
          rows={1}
          value={value}
          className=" w-full rounded-lg p-3"
        />
        <button 
          className=" bg-blue-700 h-11 px-3 rounded-full ml-5 mt-auto"
          onClick={handleSubmit}
        >
          <Image src={sendIcon} alt="send"/>
        </button>
      </div> 
    </main>   
  )
}
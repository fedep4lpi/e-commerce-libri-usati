import React from 'react'
import Image from 'next/image'
import bookSchema from './bodySchema'
import contactIcon from '@/icons/contact.svg'
import infoIcon from '@/icons/info.svg'
import Link from 'next/link'

const Card = (props: bookSchema) => {

  return (
    <div className=' bg-violet-700 text-white rounded-xl h-48 flex items-center justify-between p-5 mb-10'>
      <div className=' h-full aspect-video relative'>
        <Image
          src={`/images/${props.photo_url}`}
          alt='foto libro'
          fill
          draggable={false}
          className=' select-none object-cover'
        />
      </div>
      <div className=' text-center flex flex-col space-y-4'>
        <div>
          {props.email}
        </div>
        <div>
          ISBN-13: {props.codiceisbn}
        </div>
      </div>
      <div className=' w-64'>
        <div className=' text-right'>
          {props.Isbn_libri.titolo}
          <div className=' flex justify-between mt-2'>
            <div className=' p-2'>
              €{props.prezzo_usato}
            </div>
            <div className=' flex space-x-2'>
              <Link 
                href={`/buy/book/${props.id}`}
                className=' hover:bg-violet-800 rounded-xl p-2'
              >
                <Image
                  src={infoIcon}
                  alt='info icon'
                  draggable="false"
                />
              </Link>
              <Link 
                href={`/inbox/${props.email}`}
                className=' hover:bg-violet-800 rounded-xl p-2'
              >
                <Image
                  src={contactIcon}
                  alt='contact icon'
                  draggable="false"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
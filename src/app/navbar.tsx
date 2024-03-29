import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import homeIcon from '../icons/home.svg'
import buyIcon from '../icons/buy.svg'
import sellIcon from '../icons/sell.svg'
import inboxIcon from '../icons/inbox.svg'
import accountIcon from '../icons/account.svg'

const navbar = () => {

    const pages = [
        {
            link: '/',
            name: 'HOME',
            icon: homeIcon
        },{
            link: '/buy',
            name: 'COMPRA',
            icon: buyIcon
        },{
            link: '/sell',
            name: 'VENDI',
            icon: sellIcon
        },{
            link: '/inbox',
            name: 'MESSAGGI',
            icon: inboxIcon
        },{
            link: '/account',
            name: 'ACCOUNT',
            icon: accountIcon
        }
    ]
    
    return (
        <nav className='w-16 h-full bg-violet-700 fixed left-0 text-white group hover:w-48 transition-all z-20 select-none'>
            <ul className='h-full w-full flex flex-col pl-2 pr-2'>
                {pages.map(({ link, name, icon }, idx) => {
                    return (
                        <li key={idx} className='mb-0 mt-5 last:mt-auto last:mb-5 hover:bg-violet-800 p-1 rounded-xl'  draggable="false">
                            <Link href={link} className='w-full flex justify-start items-center' draggable="false">     
                                <Image 
                                    src={icon} 
                                    alt={`${name}-icon`}
                                    className='w-12'
                                    draggable="false"
                                />
                                <p className='hidden group-hover:block p-2 text-lg'>{name}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default navbar
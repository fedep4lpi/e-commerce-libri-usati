import React from 'react'
import { MessageType } from './types'

const Message = (props: MessageType) => {

    let sendedAt = props.sendedat.replaceAll('T', ' ')
    sendedAt = sendedAt.slice(0, 16)

    if(props.sender===localStorage.getItem('email')){
        return (
            <div className=" flex justify-start">
                <div className=' bg-violet-600 rounded-lg my-5 p-3 w-1/3 text-white'>
                    <p>
                        {props.content}
                    </p>
                    <p className=' text-right text-xs'>
                        {sendedAt}
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className=" flex justify-end">
                <div className=' bg-violet-500 rounded-lg my-5 p-3 w-1/3 text-white'>
                    <p>
                        {props.content}
                    </p>
                    <p className=' text-right text-xs'>
                        {sendedAt}
                    </p>
                </div>
            </div>
        )
    }
}

export default Message
'use client'

import { WebSocketProvider } from 'next-ws/client'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    const url = `ws://localhost:3000/api/messages`

    return (
        <WebSocketProvider
            url={url}
        >
            {children}
        </WebSocketProvider>
    )
}
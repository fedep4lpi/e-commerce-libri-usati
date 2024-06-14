import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import db from '@/db'

const bodySchema = z.object({
    receiver: z.string().min(1).max(50),
    content: z.string().min(1).max(65536)
})

export async function POST (req: NextRequest) {

    try {
        
        const body = await bodySchema.parseAsync(await req.json())
        const { receiver, content } = body

        if(receiver===req.headers.get('email')) {
            throw new Error('You can\'t message yourself')
        }

        await db.messages.create({
            data: {
                //@ts-ignore
                sender: req.headers.get('email'),
                receiver: receiver,
                content: content
            }
        })

        const response = NextResponse.json({
            message: 'message sended',
        }, { status: 200 })

        return response

    } catch (err) {

        return NextResponse.json(
            { message: String(err) },
            { status: 400}
        )

    }

}
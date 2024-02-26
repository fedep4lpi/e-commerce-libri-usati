import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import db from '@/db'

const bodySchema = z.object({
    contact: z.string().min(1).max(50)
})

export async function POST (req: NextRequest) {

    try {
        
        const body = await bodySchema.parseAsync(await req.json())
        const { contact } = body

        if(contact===req.headers.get('email')) {
            throw new Error('You can\'t message yourself')
        }

        const messages = await db.messages.findMany({
            where: {
                OR: [
                    {
                        sender: contact
                    },
                    {
                        receiver: contact
                    }
                ]
            }
        })

        return NextResponse.json({
            messages: messages,
        }, { status: 200 })

    } catch (err) {

        return NextResponse.json(
            { message: String(err) },
            { status: 400}
        )

    }

}
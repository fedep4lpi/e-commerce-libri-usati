import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const bodySchema = z.object({
    receiving: z.string().min(1).max(20),
    content: z.string().min(1).max(65536)
})

export async function POST (req: NextRequest) {

    try {
        
        const body = await bodySchema.parseAsync(await req.json())
        const { receiving, content } = body

        
        
        const response = NextResponse.json({
            message: req.headers.get('email'),
        }, { status: 200 })

        return response

    } catch (err) {

        return NextResponse.json(
            { message: String(err) },
            { status: 400}
        )

    }

}
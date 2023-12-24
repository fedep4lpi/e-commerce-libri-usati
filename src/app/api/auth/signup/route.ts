import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from 'zod'
import prisma from "@/db"
import bcrypt from 'bcrypt'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export async function POST (req: NextRequest) {

    try {

        const body = await bodySchema.parseAsync(await req.json())
        const { email, password } = body

        const passwordHash = await bcrypt.hash(password, 10)

        await prisma.users.create(
        { data: {
            email: email,
            passwordHash: passwordHash
        }})

        setTimeout(()=>{
            async () => {
                await prisma.users.delete({
                    where: {
                        email: email,
                        isVerified: false
                    }
                })
            }
        }, 8.64e+7/*24h*/)

    } catch (err) {
        
        if(err instanceof ZodError) {
            return NextResponse.json (
                { message: `body type error: ${err.issues[0].message}` }, 
                { status: 406 }
            )
        } else {
            return NextResponse.json (
                { message: `unknow error: ${err}` }, 
                { status: 500 }
            )
        }

    }

    return NextResponse.json (
        { message: 'user created with success' }, 
        { status: 200 }
    )
    
}
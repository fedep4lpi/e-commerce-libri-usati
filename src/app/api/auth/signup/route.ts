import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const bodySchema = z.object({
    username: z.string().min(8).max(20),
    password: z.string().min(8).max(20),
    email: z.string().email()
})

export async function POST (req: NextRequest) {

    try {

        const body = await bodySchema.parseAsync(await req.json())
        const { username, password, email } = body

        const passwordHash = await bcrypt.hash(password, 10)

        await prisma.users.create(
        { data: {
            username: username,
            passwordHash: passwordHash,
            email: email
        }})

        setTimeout(()=>{
            async () => {
                await prisma.users.delete({
                    where: {
                        username: username,
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
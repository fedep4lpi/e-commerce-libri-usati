import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'fast-jwt'

const bodySchema = z.object({
    username: z.string().nonempty().min(8).max(20),
    password: z.string().nonempty().min(8).max(20),
})

const prisma = new PrismaClient()

const asyncSigner = jwt.createSigner({key: async () => process.env.JWT_KEY})

export async function POST (req: NextRequest) {

    try {

        const body = await bodySchema.parseAsync((await req.json()))
        const { username, password } = body

        const { passwordHash } = await prisma.users.findUniqueOrThrow({
            where: {
                username: username
            },
            select: {
                passwordHash: true
            }
        })

        await bcrypt.compare(password, passwordHash)

        const token = await asyncSigner({ username: username })

        const response = NextResponse.json({
            message: 'User logged with sucess',
            token: token
        }, { status: 200 })
        
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3.456e+7
        })

        return response

    } catch (err) {

        return NextResponse.json(
            { message: err },
            { status: 400}
        )

    }

}
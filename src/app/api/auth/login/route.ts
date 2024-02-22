import prisma from "@/db"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30)
})

export async function POST (req: NextRequest) {

    try {
        
        const body = await bodySchema.parseAsync(await req.json())
        const { email, password } = body

        const { passwordHash } = await prisma.users.findUniqueOrThrow({
            where: {
                email: email,
                //isVerified: true
            },
            select: {
                passwordHash: true
            }
        })

        await bcrypt.compare(password, passwordHash)

        const key = new TextEncoder().encode(process.env.JWT_KEY)
        const Signer = new SignJWT({ email: email })
        const token = await Signer
        .setProtectedHeader({
            alg: process.env.JWT_ALG
        }).sign(key)

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
            { message: String(err) },
            { status: 400}
        )

    }

}
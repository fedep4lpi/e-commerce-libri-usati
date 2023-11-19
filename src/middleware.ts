import { NextResponse, NextRequest } from 'next/server'
import  { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('token')
   
    if(typeof token?.value === 'string' && token.value.length>0) {

        //IF IS FALSE TOKEN?

        const key = new TextEncoder().encode(process.env.JWT_KEY)
        const { payload } = await jwtVerify(token.value, key, {
            algorithms: [process.env.JWT_ALG]
        })

        if(typeof payload.username === 'string') {
            const { username } = payload
            req.headers.set('username', username)
        }
    }

    const notAllowedPaths = ['/sell', '/directs', '/account']

    if(!token && notAllowedPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}
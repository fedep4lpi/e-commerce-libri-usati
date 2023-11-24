import { NextResponse, NextRequest } from 'next/server'
import  { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {

    const token = req.cookies.get('token')
   
    if(typeof token?.value === 'string' && token.value.length>0) {

        //IF IS FALSE TOKEN?

        const key = new TextEncoder().encode(process.env.JWT_KEY)
        const { payload } = await jwtVerify(token.value, key)

        if(typeof payload.username === 'string') {
            const { username } = payload
            req.headers.set('username', username)
        }
    }

    const notAllowedIfNoLogPaths = ['/sell', '/directs', '/account']

    if(!token && notAllowedIfNoLogPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const notAllowedIfLogPaths = ['/login', '/signup']

    if(token && notAllowedIfLogPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/buy', req.url))
    }

    return NextResponse.next()
}
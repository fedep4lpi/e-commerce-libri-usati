import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {

    let token = req.cookies.get('token')
   
    if(typeof token?.value === 'string') {

        try {
            const key = new TextEncoder().encode(process.env.JWT_KEY)
            await jwtVerify(token.value, key)
        } catch(err){
            token = undefined
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
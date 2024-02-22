import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {

    let isAuth = false
    const token = req.cookies.get('token')
    const requestHeaders = new Headers(req.headers)
   
    if(typeof token?.value === 'string') {

        try {
            const key = new TextEncoder().encode(process.env.JWT_KEY)
            const { email } = (await jwtVerify(token.value, key)).payload
            //@ts-ignore
            requestHeaders.set('email', email)
            isAuth = true
        } catch(err){
            return NextResponse.json({
                msg: 'user not authorized'
            }, { status: 401 })
        }
    }

    const notAllowedIfNotAuthPaths = ['/sell', '/directs', '/account', '/api/messages']

    if(!isAuth && notAllowedIfNotAuthPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const notAllowedIfAuthPaths = ['/login', '/signup']

    if(isAuth && notAllowedIfAuthPaths.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/buy', req.url))
    }

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })

    return response
}
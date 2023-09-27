import { NextResponse } from "next/server";

export async function GET() {

    const response = NextResponse.json({
        message: 'user unsigned with success'
    })

    response.cookies.delete({
        name: 'token',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    return response
}
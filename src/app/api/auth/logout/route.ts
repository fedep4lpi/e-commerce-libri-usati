import { NextResponse } from "next/server";

export async function GET() {

    const response = NextResponse.json({
        message: 'user unsigned with success'
    }, { status: 200 })

    response.cookies.delete({ name: 'token' })

    return response
}
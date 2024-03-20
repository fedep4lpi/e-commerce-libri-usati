import { NextRequest, NextResponse } from "next/server"
import db from '@/db'

export async function GET (req: NextRequest) {

    try {

        let data: Array<{sender?: string, receiver?: string}>
        = await db.messages.findMany({
            distinct: ['sender'],
            select: {
                sender: true
            },
            where: {
                //@ts-ignore
                receiver: req.headers.get('email')
            }
        })

        data = data.concat(await db.messages.findMany({
            distinct: ['receiver'],
            select: {
                receiver: true
            },
            where: {
                //@ts-ignore
                sender: req.headers.get('email')
            }
        }))

        let contacts = data.map((obj) => {
            if(obj.sender) {
                return { contact: obj.sender }
            } else {
                return { contact: obj.receiver }
            }
        })

        contacts = contacts.filter((value, index, self) => {
            return index === self.findIndex((obj) => {
                return obj.contact === value.contact
            })
        })

        const response = NextResponse.json({
            contacts: contacts,
        }, { status: 200 })

        return response

    } catch (err) {

        return NextResponse.json(
            { message: String(err) },
            { status: 400}
        )

    }

}
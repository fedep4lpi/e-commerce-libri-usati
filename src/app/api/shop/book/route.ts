import prisma from "@/db"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const bodySchema = z.object({
    id: z.number().int()
})

export async function POST(req: NextRequest) {
    
    try {

        const { id } = await bodySchema.parseAsync(await req.json())

        const data = await prisma.catalogo_libri.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                codiceisbn: true,
                prezzo_usato: true,
                photo_url: true,
                Isbn_libri: {
                    select: {
                        autori: true,
                        titolo: true,
                        sottotitolo: true,
                        disciplina: true,
                        volume: true,
                        editore: true,
                        prezzo: true
                    }
                }
            }
        })

        return NextResponse.json({ 
            data: data
        }, { status: 200 })

    } catch(err) {

        return NextResponse.json({
            err: String(err)
        }, { status: 400 })
    }
}
import prisma from "@/db"
import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import { NextApiRequest } from 'next'

const bodySchema = z.object({
    query: z.string()
})

export async function POST(req: NextRequest) {
    
    try {

        const { query } = await bodySchema.parseAsync(await req.json())

        const data = await prisma.catalogo_libri.findMany({
            where: {
                OR: [{
                        codiceisbn: {
                            contains: query
                        }
                    },{
                        Isbn_libri: {
                            titolo: {
                                contains: query
                            }
                        }   
                    }
                ]
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
            },
            take: 20
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
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'
import { z } from 'zod'
import prisma from '@/db'

const bodySchema = z.object({
  isbn: z.string(),
  price: z.number()
})

export async function POST(req: NextRequest) {

  try {

    const data = await req.formData()
    const file: File | null = data.get('file') as unknown as File
    const json: string | null = data.get('json') as unknown as string

    const body = await bodySchema.parseAsync(JSON.parse(json))

    if(!file) {
      return NextResponse.json({
        message: 'file missing'
      }, { status: 400 })
    }

    if(file.size > 2e+7/*20Mb*/) {
      return NextResponse.json({
        message: 'file too large'
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uid = uuidv4()
    const path = `./public/images/${uid}.webp`

    await sharp(buffer).webp().toFile(path)

    await prisma.catalogo_libri.create({
      data: {
        codiceisbn: body.isbn,
        //@ts-ignore
        email: req.headers.get('email'),
        photo_url: `${uid}.webp`,
        prezzo_usato: body.price
      }
    })

  } catch (err) {
    return NextResponse.json({ 
      message: err 
    }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

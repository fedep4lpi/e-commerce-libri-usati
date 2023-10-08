import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'
import { z } from 'zod'

const bodySchema = z.object({
  isbn: z.string().nonempty(),
  price: z.number()
})

export async function POST(request: NextRequest) {

  try {

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File
    const json: string | null = data.get('json') as unknown as string

    const body = await bodySchema.parseAsync(JSON.parse(json))

    console.log(body)

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

    const path = `./public/images/${uuidv4()}.webp`

    await sharp(buffer).webp().toFile(path)

  } catch (err) {
    console.log(err)
    return NextResponse.json({ 
      message: err 
    })
  }

  return NextResponse.json({ success: true })
}

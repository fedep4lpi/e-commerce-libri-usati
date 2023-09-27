import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import sharp from 'sharp'

export async function POST(request: NextRequest) {

  try {

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await sharp(buffer).webp().toFile(`./public/images/${uuidv4()}.webp`)

  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: err })
  }

  return NextResponse.json({ success: true })
}

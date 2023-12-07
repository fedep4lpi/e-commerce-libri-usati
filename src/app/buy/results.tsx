import bookSchema from "./bodySchema"
import Card from "./card"

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const { a } = searchParams

  const fetchData = async (): Promise<Array<bookSchema>> => {
    const response = await fetch(
      `http://localhost:${process.env.SERVER_PORT}/api/shop`, {
        method: 'POST',
        body: JSON.stringify({
          query: a
        }),
        cache: 'no-store'
      }
    )
    const body = await response.json()
    return body.data
  }

  const data = await fetchData()

  return (
    <main className='p-10'>
      <div className=' overflow-y-scroll pt-2'>
        {data.map((book, idx) => {
          return (
            <Card 
              key={idx} 
              {...book}
            />
          )
        })}
      </div>
    </main>
  )
}
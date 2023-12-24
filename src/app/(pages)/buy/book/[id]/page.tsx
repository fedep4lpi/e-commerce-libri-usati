import { redirect } from 'next/navigation'
import bookSchema from "../../bodySchema"

export default async function Page({ 
    params 
}: { 
    params: { id: number } 
}) {

    let { id } = params
    if(typeof id === 'undefined') redirect('/buy')

    const fetchData = async (): Promise<bookSchema> => {
        const response = await fetch(
            `http://localhost:${process.env.SERVER_PORT}/api/shop/book`, {
                method: 'POST',
                body: JSON.stringify({
                    id: Number(id)
                }),
                cache: 'no-store'
            }
        )
        const body = await response.json()
        return body.data
    }

    const data = await fetchData()

    return (
        <main>
            
        </main>
    )
}
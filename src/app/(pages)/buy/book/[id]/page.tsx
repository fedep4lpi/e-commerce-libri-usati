import { redirect } from 'next/navigation'
import Image from 'next/image'
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
        <main className=' w-full h-full p-10 flex justify-center items-center'>
           <div className=' h-1/3 relative aspect-video'>
                <Image
                    src={'/images/'+data.photo_url}
                    alt='foto libro'
                    fill
                    className=' object-cover'
                />
           </div>
           <div className=' pl-10'>
                <p>
                    venditore: {data.email} 
                </p>
                <p>
                    ISBN-13: {data.codiceisbn}
                </p>
                <p>
                    titolo: {data.Isbn_libri.titolo} V. {String(data.Isbn_libri.volume)}
                </p>
                {
                    data.Isbn_libri.sottotitolo 
                    ? 
                        <p>
                            {`sottotitolo: ${data.Isbn_libri.sottotitolo}`}
                        </p> 
                    : null
                }
                <p>
                    autore/i: {data.Isbn_libri.autori}
                </p>
                <p>
                    casa editrice: {data.Isbn_libri.editore}
                </p>
                <p>
                    disciplina: {data.Isbn_libri.disciplina}
                </p>
                <p>
                    prezzo da nuovo: €{data.Isbn_libri.prezzo}
                </p>
                <p>
                    prezzo da usato proposto: €{data.prezzo_usato}
                </p>
           </div>
        </main>
    )
}
type bookSchema = {
    id?: number,
    email: string,
    codiceisbn: string,
    prezzo_usato: number,
    photo_url: string,
    Isbn_libri: {
      autori: string,
      titolo: string,
      sottotitolo: string | null,
      disciplina: string,
      volume: number,
      editore: string,
      prezzo: number
    }
}

export default bookSchema
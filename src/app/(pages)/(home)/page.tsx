import Image from 'next/image'
import IODLLogo from '@/icons/IODL_logo.svg'

export default function Home() {
  return (
    <main className=' w-full h-full flex justify-center items-center'>
      applicazione sviluppata grazie ai dati di <a href="http://dati.istruzione.it" className=' text-blue-700 px-1'>dati.istruzione.it </a> con
      <a href="http://www.dati.gov.it/iodl/2.0/" target="_blank">
        <Image src={IODLLogo} alt='IODL logo'/>
      </a>
    </main>
  )
}
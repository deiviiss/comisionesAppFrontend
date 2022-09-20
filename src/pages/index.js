import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div >
      <Head>
        <title>Comisiones App</title>
        <meta name="description" content="Manejo y control de comisiones en facturas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='Main' >
        <h1 className='text-3xl'>
          Comisiones App
        </h1>

        <p>
          Sitio demo!
        </p>

        <div className='Grid'>
          <a className='Card' href="/facturas">
            <h2>Facturas &rarr;</h2>
            <p>Agregar, editar, eliminar facturas</p>
          </a>

          <a className='Card' href="/customers">
            <h2>Clientes &rarr;</h2>
            <p>Agregar, editar, eliminar clientes</p>
          </a>

          <a className='Card' href="/users">
            <h2>Usuarios &rarr;</h2>
            <p>Agregar, editar, eliminar usuarios</p>
          </a>


        </div>
      </main>

      <footer >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span >
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

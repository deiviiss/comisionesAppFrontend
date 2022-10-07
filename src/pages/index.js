import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Comisiones App</title>
        <meta name="description" content="Manejo y control de comisiones en pedidos" />
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
          <a className='Card' href="/pedidos">
            <h2>Pedidos &rarr;</h2>
            <p>Agregar, editar, eliminar pedidos</p>
          </a>

          <a className='Card' href="/customers">
            <h2>Clientes &rarr;</h2>
            <p>Agregar, editar, eliminar clientes</p>
          </a>

        </div>
      </main>
    </>
  )
}

import { useState } from 'react';
import { usePedidos } from '@context/ProviderPedido';
import Card from '@components/CardPedido';
import Form from '@components/FormSearch';
import Modal from '@common/Modal';
import TabNav from '@common/TabNav';

export default function Pedidos() {
  //modal form pedido
  const [open, setOpen] = useState(false);

  const { pedidos, getPedidos } = usePedidos();

  const title = 'Buscar cliente'

  return (
    <>
      <header className='flex justify-between py-4'>
        <h1 className='Title'>Pedidos ({pedidos?.length})</h1>

        <div className="flex items-end justify-end flex-row">
          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md ml-2"
            onClick={() => getPedidos()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md ml-2"
            onClick={() => setOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </header>

      {/* pedidos list */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {pedidos?.map(pedido => (
          <Card pedido={pedido} key={`Pedido-${pedido._id}`} />
        ))}
      </div>

      {/* search form */}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Form setOpen={setOpen} />
      </Modal>

      <TabNav />
    </>
  );
}
import { useState } from 'react';
import { usePedidos } from '@context/ProviderPedido';
import Card from '@components/CardPedido';
import Form from '@components/FormPedido';
import Modal from '@common/Modal';

export default function Pedidos() {

  const { pedidos } = usePedidos()

  const [open, setOpen] = useState(false);
  const title = 'Ferretera Castillo'

  return (
    <>
      <div className="px-1 min-h-screen">
        <header className='flex justify-between py-4'>
          <h1 className='Title'>Pedidos ({pedidos?.length})</h1>

          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md"
            onClick={() => setOpen(true)}
          >
            Agregar Pedido
          </button>
        </header>

        {/* Pedidos list */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
          {pedidos?.map(pedido => (
            <Card pedido={pedido} key={`Pedido-${pedido._id}`} />
          ))}
        </div>

        {/* pedido form */}
        <Modal open={open} setOpen={setOpen} title={title}>
          <Form setOpen={setOpen} />
        </Modal>
      </div>
    </>
  );
}
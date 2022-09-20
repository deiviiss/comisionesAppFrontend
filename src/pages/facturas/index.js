
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { useFacturas } from '@context/ProviderFactura';
import Card from '@components/Card';
import Form from '@components/Form';
import Modal from '@common/Modal';

export default function Facturas() {

  const { facturas } = useFacturas();

  const [open, setOpen] = useState(false);
  const title = 'Nueva Factura'

  return (
    <>

      <div className="px-1 min-h-screen">
        <header className='flex justify-between py-4'>
          <h1 className='Title'>Facturas ({facturas?.length})</h1>

          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md"
            onClick={() => setOpen(true)}
          >
            Agregar Factura
          </button>
        </header>

        {/* facturas list */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
          {facturas?.map(factura => (
            <Card factura={factura} key={`Factura-${factura._id}`} />
          ))}
        </div>

        {/* factura form */}
        <Modal open={open} setOpen={setOpen} title={title}>
          <Form setOpen={setOpen} />
        </Modal>
      </div>
    </>
  );
}
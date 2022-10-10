import 'moment/locale/es';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Modal from '@common/Modal';
import Form from '@components/FormPedido'

export default function CardCustomer({ customer }) {

  const router = useRouter();

  //modal
  const [open, setOpen] = useState(false);

  const title = 'Nuevo pedido'

  return (
    <>
      <div className="bg-primary text-white rounded shadow-md shadow-black hover:bg-secondary hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="px-4 py-4">

          <div className="flex justify-between pb-4">
            <h2 className='Card-title text-white'><p>{customer.nameCustomer}</p></h2>
            <button className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/customers/edit/${customer._id}`);
              }}
            >Editar</button>
          </div>
          {/* <div className="grid grid-cols-2 gap-x-0 gap-y-1"> */}

          <div className="grid grid-cols-[100px,1fr] gap-x-0 gap-y-1">
            <p><strong>Email:</strong></p><p>{customer.email}</p>
            <p><strong>Celular:</strong></p>{customer.celular}
            <p><strong>Teléfono:</strong></p><p>{customer.telefono}</p>
          </div>

        </div>
      </div>
      {/* pedido form */}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Form setOpen={setOpen} customerId={customer._id} />
      </Modal>
    </>
  );
}
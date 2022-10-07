import { useState } from 'react';
import { useCustomers } from '@context/ProviderCustomer';
import Card from '@components/CardCustomer';
import Form from '@components/FormCustomer';
import FormSearch from '@components/FormSearch';
import Modal from '@common/Modal';
import TabNav from '@common/TabNav';

export default function Customers() {
  //modal form customer
  const [open, setOpen] = useState(false);

  //modal form search
  const [openSearch, setOpenSearch] = useState(false);

  const { customers, getCustomers } = useCustomers();

  const title = 'Nuevo Cliente'

  const titleSearch = 'Buscar cliente'

  let isCustomer;

  if (customers?.length != 0) {
    isCustomer = false
  } else {
    isCustomer = true
  }

  return (
    <>
      <header className='flex justify-between py-4'>
        <h1 className='Title'>Clientes ({customers?.length})</h1>

        <div className="flex items-end justify-end flex-row">
          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md"
            onClick={() => setOpenSearch(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <button
            type="button"
            className="px-3 py-2 bg-primary hover:bg-secondary text-white rounded-md ml-2"
            onClick={() => getCustomers()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
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

      {/* customer list */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {customers?.map(customer => (
          <Card customer={customer} key={`Customer-${customer._id}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {isCustomer ? 'No hay coincidencias' : ''
        }
      </div>

      {/* search form */}
      <Modal open={openSearch} setOpen={setOpenSearch} title={titleSearch}>
        <FormSearch setOpen={setOpenSearch} />
      </Modal>

      {/* customer form */}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Form setOpen={setOpen} />
      </Modal>

      <TabNav />
    </>
  );
}
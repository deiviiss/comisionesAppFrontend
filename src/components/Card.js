import { useFacturas } from '@context/ProviderFactura';
import { useRouter } from 'next/router';
import moment from 'moment'
import 'moment/locale/es'
import toast from 'react-hot-toast';
import { LoginIcon } from '@heroicons/react/solid';

export default function Card({ factura }) {

  const router = useRouter();

  const { deleteFactura } = useFacturas();

  const handleDelete = (facturaId) => {

    toast((t) => (
      <div>
        <p className='text-white py-3'>¿Seguro que quieres borrar la <strong>factura {facturaId}</strong> ?</p>

        <div className='flex items-center justify-between'>
          <button className="bg-red-600 hover:bg-red-500  text-white px-3 py-2 rounded-sm mx-2"
            onClick={() => {
              deleteFactura(facturaId)
              toast.dismiss(t.id)
            }}
          >Borrar</button>

          <button className="bg-indigo-500 hover:bg-indigo-600  text-white px-3 py-2 rounded-sm mx-2"
            onClick={() => { toast.dismiss(t.id) }}
          >Cancelar</button>
        </div>
      </div>
    ), {
      style: {
        background: "#202020"
      }
    })

  }

  let formatterPeso = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  let comision = formatterPeso.format(factura.cantidad * .05)

  let cantidadPesos = formatterPeso.format(factura.cantidad)

  let createAt = moment(`${factura.createAt}`).local('es').format('LL');
  let rememberAt = moment(`${factura.rememberAt}`).local('es').format('LL');
  console.log(factura.customer[0]);
  return (
    <>
      <div className="bg-primary text-white rounded shadow-md shadow-black hover:bg-secondary hover:cursor-pointer"
        onClick={() => { router.push(`/facturas/edit/${factura._id}`); }}
      >
        <div className="px-4 py-4">

          <div className="flex justify-between pb-4">
            <h2 className='Card-title text-white'>Factura {factura.folio}</h2>
            <button className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(factura._id)
              }}
            >Borrar</button>
          </div>
          <div className="grid grid-cols-2 gap-x-0 gap-y-1">
            <p><strong>Cliente</strong></p>
            <p>{factura.customer[0]?.nameCustomer} {factura.customer[0]?.lastName}</p>
            <p><strong>Cantidad:</strong></p><p>{cantidadPesos}</p>
            <p><strong>Comisión:</strong></p><p>{comision}</p>
            <p><strong>Status:</strong></p><p>{factura.status}</p>
            <p><strong>Creada:</strong></p><p>{createAt}</p>
            <p><strong>Recordatorio:</strong></p><p>{rememberAt}</p>
            <p><strong>Actualizo:</strong></p><p>{factura.user[0]?.name}</p>
          </div>

        </div>
      </div>
    </>
  );
}
import dayjs from 'dayjs'
import { usePedidos } from '@context/ProviderPedido';
import { useRouter } from 'next/router';
import 'moment/locale/es'
import toast from 'react-hot-toast';

export default function CardPedido({ pedido }) {

  const router = useRouter();

  const { deletePedido } = usePedidos();

  const handleDelete = (pedidoId, folio) => {

    toast((t) => (
      <div>
        <p className='text-white py-3'>¿Seguro que quieres borrar el Pedido con folio <strong>{folio}</strong>?</p>

        <div className='flex items-center justify-between'>
          <button className="bg-red-600 hover:bg-red-500  text-white px-3 py-2 rounded-sm mx-2"
            onClick={() => {
              deletePedido(pedidoId)
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

  // formater modeda
  let formatterPeso = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  let comision = formatterPeso.format(pedido.pedido * .03)

  let pedidoPesos = formatterPeso.format(pedido.pedido)

  if (pedido.factura != null) {
    let facturaPesos = formatterPeso.format(pedido.facturado)

  } else {
    let facturaPesos = 'No facturado'

  }

  let facturaPesos = formatterPeso.format(pedido.facturado)

  // format date DD/MM/YYYY
  let createAt = dayjs(pedido.createAt).format('DD/MM/YYYY');

  let rememberAt = dayjs(dayjs(pedido.rememberAt).add(1, 'day')).format('DD/MM/YYYY');

  return (
    <>
      <div className="bg-primary text-white rounded shadow-md shadow-black hover:bg-secondary hover:cursor-pointer"
        onClick={() => { router.push(`/pedidos/edit/${pedido._id}`); }}
      >
        <div className="px-4 py-4">

          <div className="flex justify-between pb-4">
            <h2 className='Card-title text-white'>Pedido {pedido.folio}</h2>
            <button className="bg-red-600 hover:bg-red-500 text-sm px-2 py-1 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(pedido._id, pedido.folio)
              }}
            >Borrar</button>
          </div>
          <div className="grid grid-cols-2 gap-x-0 gap-y-1">
            <p><strong>Cliente</strong></p>
            <p>{pedido.customer[0]?.nameCustomer} {pedido.customer[0]?.lastName}</p>
            <p><strong>Cantidad pedido:</strong></p><p>{pedidoPesos}</p>
            <p><strong>Comisión:</strong></p><p>{comision}</p>
            <p><strong>Cantidad factura:</strong></p><p>{facturaPesos}</p>
            <p><strong>Status:</strong></p><p>{pedido.status}</p>
            <p><strong>Creada:</strong></p><p>{createAt}</p>
            <p><strong>Recordatorio:</strong></p><p>{rememberAt}</p>
          </div>

        </div>
      </div>
    </>
  );
}
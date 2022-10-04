import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePedidos } from '@context/ProviderPedido';
import { useAuth } from '@context/ProviderAuth';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StopIcon } from '@heroicons/react/outline'

export default function FormPedido({ setOpen }) {
  const { users } = useAuth();
  const { customers } = usePedidos()

  const { addPedido, getPedido, updatePedido } = usePedidos();
  // default pedido
  const [pedido, setPedido] = useState({
    folio: '',
    pedido: '',
    facturado: '',
    notes: '',
    rememberAt: '',
    user: users[0]._id,//! usuario de sesión
    customer: '', //! traer a los customers en select array
  });

  const router = useRouter();
  if (!router.isReady) return;

  const params = router.query;

  useEffect(() => {
    if (params.id) {
      (async () => {

        const data = await getPedido(params.id)

        setPedido(data)
      })();
    }
  }, [params.id])

  // component title modal
  const HeaderForm = (id) => {
    if (id) {
      return (
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>Pedido</h3>

          <Link href={'/pedidos'} className='text-gray-400 text-sm hover:text-gray-400'>Atrás</Link>
        </header>
      )
    }
  }

  // component error
  const pError = (name) => {
    return (
      <ErrorMessage component='p' className='text-red-600 text-sm' name={name} />
    )
  }

  // component select
  const selectInput = (data, field) => {
    return (
      <div className="inline-block relative w-full">
        <Field component='select' name={field} className="px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900">
          {
            params.id ? (<option value={pedido.customer[0]?._id}>{pedido.customer[0]?.nameCustomer} {pedido.customer[0]?.lastName}</option>) : <option>Selecciona un cliente</option>
          }
          {data.map((item) => (<option value={item._id} key={`Customer-${item._id}`}>{item.nameCustomer} {item.lastName}</option>))}
        </Field>
      </div>
    )
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white p-3 pt-0 w-full">

          {HeaderForm(params?.id)}

          <Formik

            initialValues={pedido}

            validationSchema={Yup.object({
              folio: Yup.string().required('Ingresa el folio'),
              rememberAt: Yup.date().required('Ingresa el recordatorio'),
              pedido: Yup.number().required('Ingresa la cantidad del pedido'),
            })}

            // send form
            onSubmit={(values, actions) => {

              if (params.id) {
                updatePedido(params.id, values);

                router.push(`/pedidos`);
              } else {
                // on context
                addPedido(values);
                setOpen(false);
              }

              actions.setSubmitting(false)
            }}

            enableReinitialize
          >

            {/* formulario */}
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label htmlFor='folio' className='text-sm block font-bold text-primary pt-2 pb-1'>Folio</label>
                <Field
                  name='folio' placeolder='Ingresa folio' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('folio')}

                <label htmlFor='pedido' className='text-sm block font-bold text-primary pt-2 pb-1'>Importe del pedido</label>
                <Field
                  name='pedido' placeolder='Ingresa cantidad del pedido' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('pedido')}

                <label htmlFor='facturado' className='text-sm block font-bold text-primary pt-2 pb-1'>Importe de la factura</label>
                <Field
                  name='facturado' placeolder='Ingresa cantidad de la factura' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('factura')}

                <label htmlFor='customer' className='text-sm block font-bold text-primary pt-2 pb-1'>Cliente</label>

                {selectInput(customers, 'customer')}
                {pError('customer')}

                <label htmlFor='remember' className='text-sm block font-bold text-primary pt-2 pb-1'>Recordatorio</label>
                <Field
                  type='date'
                  name='rememberAt' placeolder='Ingresa recordatorio' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('rememberAt')}

                <label htmlFor='notes' className='text-sm block font-bold text-primary pt-2 pb-1'>Observaciones</label>
                <Field
                  component='textarea'
                  rows={3}
                  name='notes' placeolder='Ingresa las observaciones' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />

                {pError('notes')}

                <div className="flex justify-center py-4">
                  <button type='submit' className='bg-primary hover:bg-secondary px-4 py-2 rounded mt-2 text-white focus:outline-none disable:bg-indigo-400'
                    disabled={isSubmitting}
                  >{isSubmitting ? (
                    <StopIcon className='animate-spin h-5 w-5' />
                  ) : 'Guardar'}
                  </button>
                </div>
              </Form>
            )}

          </Formik>
        </div>
      </div>
    </>
  );
}
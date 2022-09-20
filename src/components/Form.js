import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFacturas } from '@context/ProviderFactura';
import { useAuth } from '@context/ProviderAuth';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StopIcon } from '@heroicons/react/outline'

export default function FormFactura({ setOpen }) {
  const { users } = useAuth();
  const { customers } = useFacturas()

  const { addFactura, getFactura, updateFactura } = useFacturas();
  // default factura
  const [factura, setFactura] = useState({
    folio: '',
    remember: '',
    customer: '', //! traer a los customer
    user: users[0]._id,//! usuario de sesión
    notes: '',
    cantidad: ''
  });

  const router = useRouter();
  // if (!router.isReady) return;

  const params = router.query;

  useEffect(() => {
    if (params.id) {
      (async () => {
        const data = await getFactura(params.id)
        setFactura(data)
      })();
    }
  }, [params.id])

  // close modal, redirect to posts list
  // after save post on state, redirect to posts list

  // component title modal
  const HeaderForm = (id) => {
    if (id) {

      return (
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>Factura</h3>

          <Link href={'/facturas'} className='text-gray-400 text-sm hover:text-gray-400'>Atrás</Link>
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
  console.log(customers);

  // component select
  const selectInput = (data, field) => {
    return (
      <div className="inline-block relative w-64">
        <Field component='select' name={field} className="px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900">
          <option>Selecciona un cliente</option>
          {data.map((item) => (<option value={item._id} key={`Customer-${item._id}`}>{item.nameCustomer}</option>))}
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

            initialValues={factura}

            validationSchema={Yup.object({
              folio: Yup.string().required('Ingresa el folio'),
              remember: Yup.string().required('Ingresa el recordatorio'),
              customer: Yup.string().required('Ingresa al cliente'),
              notes: Yup.string().required('Ingresa alguna observación'),
              cantidad: Yup.number().required('Ingresa la cantidad'),
            })}

            // send form
            onSubmit={(values, actions) => {

              if (params.id) {
                updateFactura(params.id, values);
                router.push(`/facturas`);
              } else {
                // on context
                addFactura(values);
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

                <label htmlFor='cantidad' className='text-sm block font-bold text-primary pt-2 pb-1'>Cantidad</label>
                <Field
                  name='cantidad' placeolder='Ingresa cantidad' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('cantidad')}

                <label htmlFor='customer' className='text-sm block font-bold text-primary pt-2 pb-1'>Cliente</label>

                {selectInput(customers, 'customer')}
                {pError('customer')}

                <label htmlFor='remember' className='text-sm block font-bold text-primary pt-2 pb-1'>Recordatorio</label>
                <Field
                  name='remember' placeolder='Ingresa recordatorio' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('remember')}

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
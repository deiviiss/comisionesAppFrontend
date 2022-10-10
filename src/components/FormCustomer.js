import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCustomers } from '@context/ProviderCustomer';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StopIcon } from '@heroicons/react/outline'

export default function FormCustomer({ setOpen }) {

  const { addCustomer, getCustomer, updateCustomer } = useCustomers();
  // default pedido
  const [customer, setCustomer] = useState({
    nameCustomer: '',
    email: '',
    celular: '',
    telefono: '',
  });

  // Warning: `value` prop on `input` should not be null.
  if (!customer.telefono) {
    customer.telefono = ''
  }

  const router = useRouter();
  if (!router.isReady) return;

  const params = router.query;

  useEffect(() => {
    if (params.id) {
      (async () => {

        const data = await getCustomer(params.id)

        setCustomer(data)
      })();
    }
  }, [params.id])

  // component title modal
  const HeaderForm = (id) => {
    if (id) {
      return (
        <header className='flex justify-between items-center py-4 text-white'>
          <h3 className='text-xl'>Cliente</h3>

          <Link href={'/customers'} className='text-gray-400 text-sm hover:text-gray-400'>Atrás</Link>
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

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white p-3 pt-0 w-full">

          {HeaderForm(params?.id)}

          <Formik

            initialValues={customer}

            validationSchema={Yup.object({
              nameCustomer: Yup.string().required('Escribe un nombre para el cliente'),
              celular: Yup.number().required('Escribe el celular del cliente'),
            })}

            // send form
            onSubmit={(values, actions) => {

              if (params.id) {
                updateCustomer(params.id, values);

                router.push(`/customers`);
              } else {
                // on context
                addCustomer(values);
                setOpen(false);
              }

              actions.setSubmitting(false)
            }}

            enableReinitialize
          >

            {/* formulario */}
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label htmlFor='nameCustomer' className='text-sm block font-bold text-primary pt-2 pb-1'>Nombre del cliente</label>
                <Field
                  name='nameCustomer' placeolder='Ferretera'
                  autoComplete="off"
                  className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('nameCustomer')}

                <label htmlFor='email' className='text-sm block font-bold text-primary pt-2 pb-1'>Correo electrónico</label>
                <Field
                  name='email'
                  autoComplete="off"
                  placeolder='ferretera@mail.com' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />

                <label htmlFor='celular' className='text-sm block font-bold text-primary pt-2 pb-1'>Celular</label>
                <Field
                  name='celular' placeolder='9811291234'
                  autoComplete="off"
                  className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />
                {pError('celular')}

                <label htmlFor='telefono' className='text-sm block font-bold text-primary pt-2 pb-1'>Teléfono</label>
                <Field
                  name='telefono'
                  autoComplete="off"
                  placeolder='9811291234' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />

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
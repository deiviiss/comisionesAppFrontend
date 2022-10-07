import { useRouter } from 'next/router';
import { useCustomers } from '@context/ProviderCustomer';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StopIcon } from '@heroicons/react/outline'

export default function SearchCustomer({ setOpen }) {

  const { filterCustomer, } = useCustomers();

  // default pedido
  const search = {
    nameCustomer: '',
  };

  const router = useRouter();
  if (!router.isReady) return;

  // component error
  const pError = (name) => {
    return (
      <ErrorMessage component='p' className='text-red-600 text-sm' name={name} />
    )
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white p-3 pr-0 pt-0 w-full">

          <Formik

            initialValues={search}

            validationSchema={Yup.object({
              nameCustomer: Yup.string().required('Escribe el nombre del cliente'),
            })}

            // send form
            onSubmit={(values, actions) => {

              filterCustomer(values.nameCustomer)
              setOpen(false);
              router.push(`/customers`);

              actions.setSubmitting(false)
            }}

            enableReinitialize
          >

            {/* formulario */}
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                {/* <label htmlFor='nameCustomer' className='text-sm block font-bold text-primary pt-2 pb-1'>Nombre del cliente</label> */}
                <div className="flex items-center justify-center flex-row">
                  <Field
                    name='nameCustomer' placeolder='Ferretera' className='px-3 py-2 focus:outline-none rounded text-primary w-full border-solid border-2 border-sky-900' />


                  <button type='submit' className='bg-primary hover:bg-secondary px-4 py-2 rounded mx-1 text-white focus:outline-none disable:bg-indigo-400'
                    disabled={isSubmitting}
                  >{isSubmitting ? (
                    <StopIcon className='animate-spin h-5 w-5' />
                  ) : 'Buscar'}
                  </button>
                </div>
                {pError('nameCustomer')}
              </Form>
            )}

          </Formik>
        </div>
      </div>
    </>
  );
}
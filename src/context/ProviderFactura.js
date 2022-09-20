import { useState, createContext, useContext, useEffect } from 'react';
// import { getFacturaRequest, addFacturasRequest, deleteFacturasRequest, getFacturasRequest, updateFacturasRequest } from '@services/api/facturasRequest';
import { addFacturasRequest, getFacturasRequest } from '@services/api/facturasRequest';
import { getCustomersRequest } from '@services/api/customerRequest'
import { useAuth } from '@context/ProviderAuth'

// container factura context
const FacturaContext = createContext();

// use factura context
export const useFacturas = () => {
  const context = useContext(FacturaContext);
  return context;
}

// factura context
// propagate factura context
export const ProviderFactura = ({ children }) => {
  // use users
  const { users } = useAuth()

  // facturas
  const [facturas, setFacturas] = useState([]);

  // save state factura
  const getFacturas = async () => {
    const response = await getFacturasRequest();
    setFacturas(response.body);
  }

  // customers
  const [customers, setCustomer] = useState([])

  // save customers
  const getCustomers = async () => {
    const response = await getCustomersRequest();

    setCustomer(response.body);
  }

  // onload page 
  useEffect(() => {
    getFacturas()
    getCustomers()
  }, [])

  // add factura
  const addFactura = async (factura) => {

    let customer = customers.filter(customer => customer._id === factura.customer)

    let user = users.filter(user => user._id === factura.user)

    let newFactura = {
      ...factura,
      customer: customer,
      user: user
    }

    console.log('New Factura');
    console.log(newFactura);

    const response = await addFacturasRequest(factura)

    console.log(response);

    let newdd = [
      ...facturas,
      response.body
    ]

    setFacturas([newdd])
    console.log(newdd);
  }

  // delete factura
  const deleteFactura = async (facturaId) => {

    const response = await deleteFacturasRequest(facturaId)

    if (response.status === 204) {
      setFacturas(posts.filter((factura) => factura.facturaId != facturaId))
    }
  }

  // get factura by id
  const getFactura = async (facturaId) => {

    const response = await getFacturasRequest(facturaId)

    return response.data
  }

  const updateFactura = async (facturaId, changes) => {

    const data = await updateFacturasRequest(facturaId, changes);

    setFacturas(facturas.map((factura => (factura.facturaId === data.facturaId ? data : factura))));
  }

  // component with context
  return <FacturaContext.Provider value={{ facturas, setFacturas, getFacturas, addFactura, customers }}>
    {children}
  </FacturaContext.Provider>
}
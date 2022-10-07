import dayjs from 'dayjs'
import { useState, createContext, useContext, useEffect } from 'react';
import { getCustomersRequest, addCustomerRequest, deleteCustomerRequest, updateCustomerRequest, getCustomerRequest, filterCustomersRequest } from '@services/api/customerRequests';

// container customer context
const customerContext = createContext();

// use customer context
export const useCustomers = () => {
  const context = useContext(customerContext);
  return context;
}

// customer context
// propagate customer context
export const ProviderCustomer = ({ children }) => {

  // customers
  const [customers, setCustomers] = useState([]);

  // save state customers
  const getCustomers = async () => {
    const response = await getCustomersRequest();

    setCustomers(response.body);
  }

  // onload page
  useEffect(() => {
    getCustomers()
  }, [])

  // add customer
  const addCustomer = async (customer) => {

    const response = await addCustomerRequest(customer)

    const newcustomer = {
      ...response.body,
    }

    setCustomers([...customers, newcustomer])
  }

  // delete customer
  const deleteCustomer = async (customerId) => {
    const response = await deleteCustomerRequest(customerId)
    if (response.status === 200) {
      setCustomers(customers.filter((customer) => customer._id != customerId))
    }
  }

  // get customer by id
  const getCustomer = async (customerId) => {

    const response = await getCustomerRequest(customerId)

    const customer = {
      ...response.data.body,
    }

    return customer
  }

  const updateCustomer = async (customerId, changes) => {

    const update = {
      ...changes,
    }

    await updateCustomerRequest(customerId, update);

    await getCustomers()
  }

  const filterCustomer = async (customerFilter) => {

    const response = await filterCustomersRequest(customerFilter);

    setCustomers(response.body);
  }

  // component with context
  return <customerContext.Provider value={{ customers, setCustomers, getCustomers, getCustomer, addCustomer, customers, deleteCustomer, updateCustomer, filterCustomer }}>
    {children}
  </customerContext.Provider>
}
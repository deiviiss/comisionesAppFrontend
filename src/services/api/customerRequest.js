import axios from 'axios';
import endPoints from '../api/endpoints';

const getCustomersRequest = async () => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    },
  };

  // request axios endpoints diccionary
  const response = await axios.get(endPoints.customers.getCustomers(), config)

  return response.data;
}

const addCustomerRequest = async (customer) => {

  const form = new FormData();
  // add customer to form
  for (let key in customer) {
    form.append(key, customer[key])
  }

  // request axios endpoints diccionary
  const response = await axios.post(endPoints.customers.addCustomer, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })

  return response.data;
}

const deleteCustomerRequest = async (customerId) => {
  // request axios endpoints diccionary
  const response = await axios.delete(endPoints.customers.deleteCustomer(customerId));

  return response
}

const getCustomerRequest = async (customerId) => {
  // request axios endpoints diccionary
  const response = await axios.get(endPoints.customers.getCustomer(customerId));

  return response;
}

const updateCustomerRequest = async (customerId, changes) => {
  // request axios endpoints diccionary
  const response = await axios.put(endPoints.customers.updateCustomer(customerId), changes);

  return response.data;
}

export { getCustomersRequest, addCustomerRequest, deleteCustomerRequest, updateCustomerRequest, getCustomerRequest }
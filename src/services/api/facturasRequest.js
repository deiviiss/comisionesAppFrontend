

import axios from 'axios';
import endPoints from '../api/endpoints';

const getFacturasRequest = async () => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    },
  };

  // request axios endpoints diccionary
  const response = await axios.get(endPoints.facturas.getFacturas(), config)

  return response.data;
}

const addFacturasRequest = async (factura) => {

  const form = new FormData();
  // add factura to form
  for (let key in factura) {
    form.append(key, factura[key])
  }

  // request axios endpoints diccionary
  const response = await axios.post(endPoints.facturas.addFactura, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })

  return response.data;
}

const deleteFacturasRequest = async (facturaId) => {
  // request axios endpoints diccionary
  const response = await axios.delete(endPoints.facturas.deleteFactura(facturaId));

  return response
}

const getFacturaRequest = async (facturaId) => {
  // request axios endpoints diccionary
  const response = await axios.get(endPoints.facturas.getFactura(facturaId));

  return response;
}

const updateFacturasRequest = async (facturaId, changes) => {
  // request axios endpoints diccionary
  const response = await axios.put(endPoints.facturas.updateFactura(facturaId), changes);

  return response.data;
}

export { getFacturasRequest, addFacturasRequest, deleteFacturasRequest, updateFacturasRequest, getFacturaRequest }
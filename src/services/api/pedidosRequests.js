import axios from 'axios';
import endPoints from './endpoints';

const getPedidosRequest = async () => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json'
    },
  };

  // request axios endpoints diccionary
  const response = await axios.get(endPoints.pedidos.getPedidos(), config)

  return response.data;
}

const addPedidoRequest = async (pedido) => {

  const form = new FormData();
  // add pedido to form
  for (let key in pedido) {
    form.append(key, pedido[key])
  }

  // request axios endpoints diccionary
  const response = await axios.post(endPoints.pedidos.addPedido, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })

  return response.data;
}

const deletePedidoRequest = async (pedidoId) => {
  // request axios endpoints diccionary
  const response = await axios.delete(endPoints.pedidos.deletePedido(pedidoId));

  return response
}

const getPedidoRequest = async (pedidoId) => {
  // request axios endpoints diccionary
  const response = await axios.get(endPoints.pedidos.getPedido(pedidoId));

  return response;
}

const updatePedidoRequest = async (pedidoId, changes) => {
  // request axios endpoints diccionary
  const response = await axios.patch(endPoints.pedidos.updatePedido(pedidoId), changes);

  return response.data.body;
}

export { getPedidosRequest, addPedidoRequest, deletePedidoRequest, updatePedidoRequest, getPedidoRequest }

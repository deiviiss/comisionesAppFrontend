import dayjs from 'dayjs'
import { useState, createContext, useContext, useEffect } from 'react';
import { addPedidoRequest, getPedidosRequest, deletePedidoRequest, getPedidoRequest, updatePedidoRequest } from '@services/api/pedidosRequests';
import { getCustomersRequest } from '@services/api/customerRequests'
import { useAuth } from '@context/ProviderAuth'
import { useCustomers } from '@context/ProviderCustomer'

// container pedido context
const PedidoContext = createContext();

// use pedido context
export const usePedidos = () => {
  const context = useContext(PedidoContext);
  return context;
}

// pedido context
// propagate pedido context
export const ProviderPedido = ({ children }) => {
  // use users
  const { users } = useAuth()
  const { customers } = useCustomers();

  // pedidos
  const [pedidos, setPedidos] = useState([]);

  // save state pedidos
  const getPedidos = async () => {
    const response = await getPedidosRequest();

    setPedidos(response.body);
  }

  // // customers
  // const [customers, setCustomer] = useState([])

  // save state customers
  // const getCustomers = async () => {
  //   const response = await getCustomersRequest();

  //   setCustomer(response.body);
  // }

  // onload page
  useEffect(() => {
    getPedidos()
  }, [])

  // add pedido
  const addPedido = async (pedido) => {

    let customer = customers.filter(customer => customer._id === pedido.customer)
    let user = users.filter(user => user._id === pedido.user)

    const response = await addPedidoRequest(pedido)

    const newPedido = {
      ...response.body,
      customer,
      user
    }

    setPedidos([...pedidos, newPedido])
  }

  // delete pedido
  const deletePedido = async (pedidoId) => {
    const response = await deletePedidoRequest(pedidoId)
    if (response.status === 200) {
      setPedidos(pedidos.filter((pedido) => pedido._id != pedidoId))
    }
  }

  // get pedido by id
  const getPedido = async (pedidoId) => {

    const response = await getPedidoRequest(pedidoId)

    // format date YYYY/MM/DD
    let rememberAt = dayjs(dayjs(response.data.body.rememberAt).add(1, 'day')).format('YYYY-MM-DD');

    const pedido = {
      ...response.data.body,
      rememberAt: rememberAt,
    }

    return pedido
  }

  const updatePedido = async (pedidoId, changes) => {

    const update = {
      ...changes,
      user: users[0]._id
    }

    await updatePedidoRequest(pedidoId, update);

    await getPedidos()
  }

  // component with context
  return <PedidoContext.Provider value={{ pedidos, setPedidos, getPedidos, getPedido, addPedido, customers, deletePedido, updatePedido }}>
    {children}
  </PedidoContext.Provider>
}
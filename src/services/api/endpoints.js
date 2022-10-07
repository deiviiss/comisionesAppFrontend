//endpoints diccionario
const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  pedidos: {
    getPedidos: () => {
      return `${API}/api/${VERSION}/pedidos`
    },
    getPedido: (id) => {
      return `${API}/api/${VERSION}/pedidos/${id}`
    },
    addPedido: `${API}/api/${VERSION}/pedidos`,
    updatePedido: (id) => `${API}/api/${VERSION}/pedidos/${id}`,
    deletePedido: (id) => `${API}/api/${VERSION}/pedidos/${id}`
  },
  customers: {
    getCustomers: () => {
      return `${API}/api/${VERSION}/customers`
    },
    getCustomer: (id) => {
      return `${API}/api/${VERSION}/customers/${id}`
    },
    addCustomer: `${API}/api/${VERSION}/customers`,
    updateCustomer: (id) => `${API}/api/${VERSION}/customers/${id}`,
    deleteCustomer: (id) => `${API}/api/${VERSION}/customers/${id}`,
    filterCustomers: (filter) => {
      return `${API}/api/${VERSION}/customers/filter?nameCustomer=${filter}`
    },
  }
}

export default endPoints;
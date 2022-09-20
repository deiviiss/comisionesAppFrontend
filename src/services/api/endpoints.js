//endpoints diccionario
const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  facturas: {
    getFacturas: () => {
      return `${API}/api/${VERSION}/facturas`
    },
    getFactura: (id) => {
      return `${API}/api/${VERSION}/facturas/${id}`
    },
    addFactura: `${API}/api/${VERSION}/facturas`,
    updateFactura: (id) => `${API}/api/${VERSION}/facturas/${id}`,
    deleteFactura: (id) => `${API}/api/${VERSION}/facturas/${id}`
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
    deleteCustomer: (id) => `${API}/api/${VERSION}/customers/${id}`
  }
}

export default endPoints;
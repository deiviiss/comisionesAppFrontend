import '../styles/tailwind.css'
import { Toaster } from 'react-hot-toast';
import { ProviderPedido } from '../context/ProviderPedido';
import { ProviderCustomer } from '../context/ProviderCustomer';
import { ProviderAuth } from '../context/ProviderAuth'
import MainLayout from '../layout/MainLayout'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <ProviderCustomer>
        <ProviderPedido>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>

          <Toaster />
        </ProviderPedido>
      </ProviderCustomer>
    </ProviderAuth>
  )
}

export default MyApp

import '../styles/tailwind.css'
import { Toaster } from 'react-hot-toast';
import { ProviderPedido } from '../context/ProviderPedido';
import { ProviderAuth } from '../context/ProviderAuth'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <ProviderPedido>
        <Component {...pageProps} />
        <Toaster />
      </ProviderPedido>
    </ProviderAuth>
  )
}

export default MyApp

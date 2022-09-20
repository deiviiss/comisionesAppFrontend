import '../styles/tailwind.css'
import { Toaster } from 'react-hot-toast';
import { ProviderFactura } from '../context/ProviderFactura';
import { ProviderAuth } from '../context/ProviderAuth'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <ProviderFactura>
        <Component {...pageProps} />
        <Toaster />
      </ProviderFactura>
    </ProviderAuth>
  )
}

export default MyApp

import Navbar from '@/components/Navbar'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  <Navbar />
  return <Component {...pageProps} />
}

export default MyApp

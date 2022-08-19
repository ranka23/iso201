import "../styles/globals.css"
import type { AppProps } from "next/app"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useRouter } from "next/router"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    
      <Component {...pageProps} />
    
  )
}

export default MyApp

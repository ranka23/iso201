import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { OnApproveData } from "@paypal/paypal-js/types/components/buttons"
import { post, get } from "services/call"
import { useCallback, useState } from "react"
import axios from "services/call"
import { QRCode } from "components/QRCode/QRCode"

const Subscribe: React.FC = () => {
  const [reference, setReference] = useState({
    qr: "",
    invoiceID: "",
  })
  const paypalInitialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    currency: "USD",
  }
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [error, setError] = useState("")

  const onCreateSolanaOrder = useCallback(async () => {
    try {
      const res = await axios.get<{
        qr: string
        invoiceID: string
        reference: string
      }>(`/subscriptions/solana/create`, {})
      setReference(res.data)
    } catch (error: any) {
      setError(error)
    }
  }, [])

  const onCreatePaypalOrder = async () => {
    const response = await get<{ id: string }>("/subscriptions/paypal/create")
    console.log("Response:", response.data)
    return response.data.id
  }

  const onVerifyPaypalOrder = async (data: OnApproveData) => {
    const response = await get<{ id: string }>(
      `/subscriptions/paypal/${data.orderID}/complete`
    )
    console.log("Response:", response.data)
  }

  const onVerifySolanaOrder = useCallback(async () => {
    try {
      const response = await get<{ message: string }>(
        `/subscriptions/solana/${reference.invoiceID}/complete`
      )
      if (response.data.message == "success") {
        setIsPaymentSuccess(true)
      }
    } catch (error: any) {
      setError(error.toString())
    }
  }, [reference])

  return (
    <>
      <PayPalScriptProvider options={paypalInitialOptions}>
        <PayPalButtons
          onApprove={onVerifyPaypalOrder}
          createOrder={onCreatePaypalOrder}
        />
      </PayPalScriptProvider>
      {reference.qr ? (
        <>
          <QRCode url={reference.qr} />
          <button onClick={onVerifySolanaOrder}>Verify Payment</button>
        </>
      ) : (
        <button onClick={onCreateSolanaOrder}>Pay with Solana</button>
      )}
      {isPaymentSuccess ? <h2>Success</h2> : null}
      {error ? <h2>{error.toString()}</h2> : null}
    </>
  )
}
export default Subscribe

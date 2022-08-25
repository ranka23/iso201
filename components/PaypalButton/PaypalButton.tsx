import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer()
  return (
    <>
      <PayPalButtons style={{ layout: "horizontal" }} />
    </>
  )
}

export default PaypalButton

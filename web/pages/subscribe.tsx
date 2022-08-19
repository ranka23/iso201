import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import {
  OnApproveData,
  OnApproveActions,
  CreateOrderActions,
  CreateOrderData,
} from "@paypal/paypal-js/types/components/buttons"
import { post } from "../services/call"

const Subscribe: React.FC = () => {
  const paypalInitialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    currency: "USD",
  }

  const onPaypalCreateOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const response = await post<{ id: string }>("/subscriptions/create")
    console.log("Response:", response.data)
    return response.data.id
  }

  const onPaypalApproveOrder = async (data: OnApproveData, actions: OnApproveActions) => {
    const response = await post<{ id: string }>(
      `/subscriptions/${data.orderID}/capture`,
      {
        orderID: data.orderID,
      }
    )
    console.log("Response:", response.data)
  }

  return (
    <PayPalScriptProvider options={paypalInitialOptions}>
      <PayPalButtons onApprove={onPaypalApproveOrder} createOrder={onPaypalCreateOrder} />
    </PayPalScriptProvider>
  )
}
export default Subscribe

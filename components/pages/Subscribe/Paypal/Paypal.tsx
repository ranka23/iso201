import { OnApproveData } from "@paypal/paypal-js/types/components/buttons"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import errors from "constants/errors"
import { useError } from "hooks/useError"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { get } from "services/axios"
import CurrencySelect from "widgets/CurrencySelect/CurrencySelect"
import FadeInOut from "../../../widgets/Animated/FadeInOut"
import MountUnMount from "../../../widgets/Animated/MountUnMount"
import Loader from "../../../widgets/Loader/Loader"
import Success from "../Solana/Success"

interface Props {
  onSuccess: Dispatch<SetStateAction<boolean>>
  setAmount: Dispatch<SetStateAction<{ price: number; currency: string }>>
  isSuccess: boolean
}

const Paypal: React.FC<Props> = ({ onSuccess, setAmount, isSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [{ options, isPending, isResolved }, dispatch] =
    usePayPalScriptReducer()
  const [currency, setCurrency] = useState<AvailableCurrencies>(
    options.currency as AvailableCurrencies
  )

  const { dispatch: errorDispatch } = useError()

  const handleOnCurrencyChange = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLSelectElement>) => {
    setCurrency(value as AvailableCurrencies)
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    })
  }

  const handleOnCreatePaypalOrder = useCallback(async () => {
    setIsLoading(false)
    try {
      const response = await get<CreatePaypalOrderResponse & ErrorResponse>(
        `/subscriptions/paypal/create`,
        {
          currency: options.currency || "USD",
        }
      )
      if (response.status !== 200) {
        errorDispatch({ type: "SET_ERROR", payload: response.data.error })
      }
      setAmount({
        price: parseFloat(
          response.data.currency === "USD"
            ? (parseFloat(response.data.amount) - 10).toFixed(2)
            : response.data.amount
        ),
        currency:
          response.data.currency === "USD" ? "$" : response.data.currency,
      })
      setIsLoading(false)
      return response.data?.id || ""
    } catch (error: any) {
      setIsLoading(false)
      errorDispatch({
        type: "SET_ERROR",
        payload: {
          code: errors.failed_to_place_order.code,
          message: errors.failed_to_place_order.message,
        },
      })
    }
  }, [errorDispatch, options.currency, setAmount])

  const handleOnVerifyPaypalOrder = useCallback(
    async (data: OnApproveData) => {
      setIsLoading(true)
      try {
        const response = await get<SuccessResponse & ErrorResponse>(
          `/subscriptions/paypal/${data.orderID}/complete`
        )
        setIsLoading(false)
        if (response.data.success) {
          return onSuccess(response.data.success)
        } else {
          return errorDispatch({
            type: "SET_ERROR",
            payload: response.data.error,
          })
        }
      } catch (error) {
        setIsLoading(false)
        errorDispatch({
          type: "SET_ERROR",
          payload: {
            code: errors.unverified_payment.code,
            message: errors.unverified_payment.message,
          },
        })
      }
    },
    [errorDispatch, onSuccess]
  )
  return (
    <div>
      <MountUnMount isVisible={!isSuccess}>
        <>
          <h4 className="text-2xl font-bold mb-6 text-center">
            Payments in multiple currencies
          </h4>
          <p className="pb-4 text-center">
            An <strong>additional $10</strong> charged for processing the
            transaction.
          </p>
          <FadeInOut isVisible={isResolved}>
            <CurrencySelect
              currency={currency}
              onChange={handleOnCurrencyChange}
            />
            <PayPalButtons
              onApprove={handleOnVerifyPaypalOrder}
              /* @ts-ignore */
              createOrder={handleOnCreatePaypalOrder}
            />
            <p className="text-sm">
              Due to restrictions, payments via Paypal aren&apos;t supported in
              some countries like India. Please choose Solana Pay if your
              country isn&apos;t supported.
            </p>
          </FadeInOut>
          <FadeInOut isVisible={isPending}>
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
          </FadeInOut>
          <FadeInOut isVisible={isLoading}>
            <div className="flex items-center justify-center w-full mt-6">
              <Loader />
            </div>
          </FadeInOut>
        </>
      </MountUnMount>
      <MountUnMount isVisible={isSuccess}>
        <div className="mt-12">
          <Success />
        </div>
      </MountUnMount>
    </div>
  )
}

export default Paypal

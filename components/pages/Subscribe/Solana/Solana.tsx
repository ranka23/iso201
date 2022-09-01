import errors from "constants/errors"
import { useError } from "hooks/useError"
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react"
import { get } from "services/axios"
import MountUnMount from "widgets/Animated/MountUnMount"
import CheckoutStepIndicator from "../CheckoutStepIndicator/CheckoutStepIndicator"
import Details from "./Details"
import QR from "./QR"
import Success from "./Success"

interface Props {
  onSuccess: Dispatch<SetStateAction<boolean>>
  isSuccess: boolean
}

const Solana: React.FC<Props> = ({ onSuccess, isSuccess }) => {
  const { dispatch } = useError()
  const [reference, setReference] = useState({
    qr: "",
    invoiceID: "",
  })
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1)
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setActiveStep(3)
    }
  }, [isSuccess])

  const handleCreateSolanaOrder = useCallback(async () => {
    try {
      const res = await get<CreateSolanaOrderResponse & ErrorResponse>(`/subscriptions/solana/create`)
      if (res.data.qr) {
        setReference(res.data)
        setActiveStep(2)
      } else {
        dispatch({ type: "SET_ERROR", payload: res.data.error })
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          code: errors.failed_to_place_order.code,
          message: errors.failed_to_place_order.message,
        },
      })
    }
  }, [dispatch])

  const handleVerifySolanaOrder = useCallback(async () => {
    try {
      setShowLoader(true)
      const response = await get<SuccessResponse & ErrorResponse>(
        `/subscriptions/solana/${reference.invoiceID}/complete`
      )
      if (response.data.success) {
        onSuccess(response.data.success)
        setActiveStep(3)
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: response.data.error
        })
      }
      setShowLoader(false)
    } catch (error: any) {
      setShowLoader(false)
      dispatch({
        type: "SET_ERROR",
        payload: {
          code: errors.unverified_payment.code,
          message: errors.unverified_payment.message,
        },
      })
    }
  }, [dispatch, onSuccess, reference])

  return (
    <div>
      <h4 className="text-2xl font-bold text-center my-6">
        We accept payments in USDC
      </h4>
      <CheckoutStepIndicator activeStep={activeStep} />
      <MountUnMount
        isVisible={activeStep === 1}
        orientation="horizontal"
        horizontalDirection="leftToRight"
      >
        <Details onClick={handleCreateSolanaOrder} />
      </MountUnMount>
      <MountUnMount
        isVisible={activeStep === 2}
        orientation="horizontal"
        horizontalDirection="leftToRight"
      >
        <QR
          qr={reference.qr}
          onClick={handleVerifySolanaOrder}
          showLoader={showLoader}
        />
      </MountUnMount>
      <MountUnMount
        isVisible={activeStep === 3 || isSuccess}
        orientation="horizontal"
        horizontalDirection="leftToRight"
      >
        <Success />
      </MountUnMount>
    </div>
  )
}

export default Solana

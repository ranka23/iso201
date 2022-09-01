import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import Paypal from "components/pages/Subscribe/Paypal/Paypal"
import Solana from "components/pages/Subscribe/Solana/Solana"
import { NextPageContext } from "next"
import { FormEvent, useCallback, useState } from "react"
import { isUserPro } from "services/jwt"
import MountUnMount from "widgets/Animated/MountUnMount"
import GoBack from "../components/pages/Subscribe/GoBack"
import PriceAndInfo from "../components/pages/Subscribe/PriceAndInfo"
import ProviderSelect from "../components/pages/Subscribe/ProviderSelect"
import { parseCookies } from "../utils/cookies"

const paypalInitialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: "USD",
}

interface Props {
  price: number
  discountCaption: string
  description: Array<string>
}

const Subscribe: React.FC<Props> = ({
  price,
  discountCaption,
  description,
}) => {
  const [provider, setProvider] = useState<PaymentProvider>("solana")
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [amount, setAmount] = useState({
    price,
    currency: "$",
  })
  const handleProviderChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.currentTarget
      setProvider(value as PaymentProvider)
    }
  }, [])

  return (
    <PayPalScriptProvider options={paypalInitialOptions}>
      <div className="md:flex w-100%">
        <div className="bg-black md:w-[50%] md:min-h-screen pl-4 pt-12 text-white">
          <div className="max-w-[70%] m-auto">
            <GoBack />
            <div className="py-12">
              <PriceAndInfo
                discountCaption={discountCaption}
                description={description}
                amount={amount}
                provider={provider}
              />
              <ProviderSelect
                onChange={handleProviderChange}
                provider={provider}
                disabled={isPaymentSuccess}
              />
            </div>
          </div>
        </div>
        <div className="bg-white md:w-[50%] pr-4 md:min-h-screen pt-12">
          <div className="m-auto w-[80%] max-w-[420px]">
            <MountUnMount isVisible={provider === "paypal"}>
              <Paypal
                isSuccess={isPaymentSuccess}
                setAmount={setAmount}
                onSuccess={setIsPaymentSuccess}
              />
            </MountUnMount>
            <MountUnMount isVisible={provider === "solana"}>
              <Solana
                isSuccess={isPaymentSuccess}
                onSuccess={setIsPaymentSuccess}
              />
            </MountUnMount>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  )
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { req } = context
  const cookies = parseCookies(req?.headers?.cookie || "")
  const accessToken = cookies?.accessToken
  const goBackToHomePage = {
    redirect: {
      destination: "/",
      permanent: false,
    },
  }

  const description = [
    "Unlimited downloads",
    "4K and HD Videos",
    "High-res Images",
    "Complete usage rights",
    "For Youtube channel",
    "For social media accounts",
    "For designs, ads or marketing",
  ]

  const props = {
    props: {
      price: 30,
      discountCaption: "50% early bird discount",
      description,
    },
  }

  if (!accessToken) {
    return goBackToHomePage
  }

  const isPro = await isUserPro(accessToken)

  if (!isPro) {
    return props
  }
  return goBackToHomePage
}

export default Subscribe

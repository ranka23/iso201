import Image from "next/image"
import Icon from "widgets/Icon/Icon"
import favicon from "public/favicon.ico"
import solanaPayLogo from "public/solana-pay-logo.svg"
import paypalLogo from "public/paypal-logo.svg"
import { FormEvent, ReactNode } from "react"

interface Props {
  provider: PaymentProvider
  onChange: (e: FormEvent<HTMLInputElement>) => void
  disabled: boolean
}

const ProviderSelect: React.FC<Props> = ({ onChange, provider, disabled }) => {
  return (
    <div className="m-auto max-w-[300px] rounded-lg overflow-hidden bg-white text-black">
      <div className="py-3 pr-3 flex item-center justify-between">
        <div className="flex item-center">
          <div className="bg-white pt-3 pb-2 px-3 w-max">
            <Image
              src={favicon}
              width={24}
              height={24}
              alt="logo"
              objectFit="contain"
            />
          </div>
          <div className="text-left ml-1">
            <h4 className="font-bold text-lg">iso201 Pro</h4>
            <p className="opacity-70 font-medium">
              <span>Qty:</span> 1
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg">365 days</p>
          <p className="font-medium opacity-70">$2.5 / month</p>
        </div>
      </div>
      <div className="max-w-[300px] m-auto flex flex-col items-center">
        <PaymentRadio
          name="paymentMode"
          onChange={onChange}
          provider={provider}
          disabled={disabled}
          value="solana"
          logo={
            <>
              <Icon src={solanaPayLogo} height={38} />
              <span>No processing fee</span>
            </>
          }
        />
        <PaymentRadio
          name="paymentMode"
          onChange={onChange}
          provider={provider}
          disabled={disabled}
          value="paypal"
          logo={
            <>
              <Icon src={paypalLogo} />
              <span>
                Additional <strong>$10</strong> processing fee
              </span>
            </>
          }
        />
      </div>
    </div>
  )
}

export default ProviderSelect

interface PaymentRadioProps {
  provider: PaymentProvider
  onChange: (e: FormEvent<HTMLInputElement>) => void
  value: PaymentProvider
  name: string
  logo: ReactNode
  disabled: boolean
}

const PaymentRadio: React.FC<PaymentRadioProps> = ({
  name,
  onChange,
  provider,
  logo,
  value,
  disabled,
}: PaymentRadioProps) => {
  return (
    <label className="flex items-center p-4 w-[100%] bg-white overflow-hidden border border-slate-200 -mt-[1px]">
      <input
        name={name}
        value={value}
        type="radio"
        checked={provider === value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="ml-6">{logo}</div>
    </label>
  )
}

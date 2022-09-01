import check from "public/icons/check.svg"
import Icon from "widgets/Icon/Icon"

interface Props {
  provider: PaymentProvider
  description: Array<string>
  discountCaption: string
  amount: {
    price: number
    currency: string
  }
}

const PriceAndInfo: React.FC<Props> = ({
  amount,
  provider,
  description,
  discountCaption,
}) => {
  return (
    <>
      <div className="max-w-[300px] m-auto">
        <div className="text-2xl font-semibold mb-2 opacity-80">
          Subscribe for One Year
        </div>
        <div className="text-7xl font-bold flex items-start">
          <span className="text-4xl mt-1 mr-1">{amount.currency}</span>
          <span>
            {provider === "paypal" && amount.currency === "$"
              ? `${10 + amount.price} only`
              : amount.price}
          </span>
        </div>
        {discountCaption ? (
          <div className="text-2xl font-semibold mt-2 opacity-80 transition-opacity hover:transition-opacity">
            {discountCaption}
          </div>
        ) : null}
      </div>
      <div className="text-left font-medium text-xl max-w-[300px] m-auto my-12 pl-1">
        {description.map((desc) => (
          <div key={desc} className="opacity-80 flex items-center mb-3">
            <Icon src={check} height={16} />
            <span className="ml-3 text-center text-lg font-medium">{desc}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default PriceAndInfo

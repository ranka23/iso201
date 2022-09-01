import Icon from "widgets/Icon/Icon"
import check from "public/icons/check.svg"

const Pricing = () => {
  return (
    <div className="w-80 rounded-2xl shadow-md overflow-hidden bg-white">
      <p className="bg-black text-center text-2xl font-bold text-white py-3">
        Pro
      </p>
      <div className="flex p-6 justify-center flex-col">
        <div>
          <div className="text-6xl font-black flex items-top justify-center mr-3">
            <span className="text-3xl">$</span>
            <span>5</span>
          </div>
          <p className="text-2xl font-bold text-center mb-6">a month</p>
          {points.map((point) => (
            <div key={point} className="flex items-center mb-2">
              <Icon src={check} height={16} />
              <span className="ml-2 text-center text-lg font-medium">
                {point}
              </span>
            </div>
          ))}
          <p className="mb-1 mt-6 text-center font-medium text-xl">
            50% early bird discount
          </p>

          <div className="flex justify-center items-end">
            <div className="flex items-top justify-center mr-1">
              <span className="text-2xl font-black line-through">$5</span>
            </div>
            <div className="flex items-end mr-3">
              <div className="flex items-top justify-center">
                <span className="text-xl font-black">$</span>
                <span className="text-4xl font-black">2.5</span>
              </div>
              <p className="text-md font-black content-end text-center ml-1">
                / mo
              </p>
            </div>
          </div>
        </div>
        <button className="my-3 py-3 font-bold text-center bg-black text-white rounded-full hover:opacity-90 transition-opacity">
          Subscribe for $2.50
        </button>
        <p className=" text-xs text-center">
          * Only usage rights are granted. Re-sale or distribution of assets will
          lead to legal action.
        </p>
        <p className=" text-xs text-center mt-2">
          * Price not inclusive of processing charges
        </p>
        <p className=" text-xs text-center mt-2">
        * Charged on an annual basis.
        </p>
      </div>
    </div>
  )
}

export default Pricing

const points = [
  "Unlimited downloads",
  "4K & HD videos",
  "High-res images",
  "For YouTube & social media",
  "For advertising & marketing",
]

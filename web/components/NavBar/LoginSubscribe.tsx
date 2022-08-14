import { useState } from "react"
import chevron from "../../public/icons/chevron.svg"
import Pricing from "../Popups/Pricing"
import Icon from "../widgets/Icon/Icon"

const LoginSubscribe = () => {
  const [showPricingPopup, setShowPricingPopup] = useState(false)
  const className =
    "opacity-60 cursor-pointer hover:opacity-100 transition-opacity"

  const showPricing = () => {
    setShowPricingPopup(true)
  }

  const hidePricing = () => {
    setShowPricingPopup(false)
  }

  return (
    <div className="relative flex items-center mx-6">
      <span
        onMouseEnter={showPricing}
        className={`mr-6 flex items-center ${className} ${showPricingPopup ? "opacity-100" : ""}`}
      >
        <span className="mr-0.5 relative">Pricing</span>
        <Icon className="-rotate-90" src={chevron} />
      </span>
      <span className={className}>Login</span>
      <span className="px-3 opacity-60">/</span>
      <span tabIndex={0} className={className}>
        Subscribe
      </span>
      {showPricingPopup ? (
        <>
          <div className="z-20 absolute top-10">
            <Pricing />
          </div>
          <div
            onMouseEnter={hidePricing}
            className="z-10 fixed w-full h-full top-20 bottom-0 left-0 right-0 bg-white opacity-0"
          ></div>
        </>
      ) : null}
    </div>
  )
}

export default LoginSubscribe

import { useState } from "react"
import chevron from "public/icons/chevron.svg"
import getGoogleOAuthURL from "utils/getGoogleUri"
import Pricing from "../Popups/Pricing"
import Icon from "widgets/Icon/Icon"
import FadeInOut from "widgets/Animated/FadeInOut"
import Link from "next/link"

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
        onClick={showPricing}
        className={`mr-6 flex items-center ${className} ${
          showPricingPopup ? "opacity-100" : ""
        }`}
      >
        <span className="mr-0.5 relative">Pricing</span>
        <Icon className="-rotate-90" src={chevron} />
      </span>
      <Link href={'/login'}>
        <a className={className}>
          Login
        </a>
      </Link>
      <span className="px-3 opacity-60">/</span>
      <Link href="/subscribe">
        <a className={className}>Subscribe</a>
      </Link>
      <FadeInOut isTop={true} isVisible={showPricingPopup}>
        <div className="z-9999 absolute mt-6 right-0">
          <Pricing />
        </div>
        <div
          onClick={hidePricing}
          className="z-10 fixed w-full h-full top-0 bottom-0 left-0 bg-white opacity-0"
        ></div>
      </FadeInOut>
    </div>
  )
}

export default LoginSubscribe

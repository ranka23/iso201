import { IS_DISCOUNT, IS_TAX } from "../constants"

export default function getSubscriptionAmount(
  isProcessingFee: boolean = false
) {
  const basePrice = parseFloat(process.env.SUBSCRIPTION_BASE_PRICE as string)
  const discount = parseFloat(
    process.env.SUBSCRIPTION_DISCOUNT_PERCENTAGE as string
  )
  const tax = parseFloat(process.env.SUBSCRIPTION_TAX_PERCENTAGE as string)
  const processingFee = parseFloat(process.env.SUBSCRIPTION_PROCESSING_FEE as string)

  return calculatePricingBreakdown(
    basePrice,
    IS_DISCOUNT ? discount : undefined,
    IS_TAX ? tax : undefined,
    isProcessingFee ? processingFee : undefined
  )
}

export const calculatePricingBreakdown = (
  basePrice: number,
  discount?: number,
  tax?: number,
  processingFee?: number,
) => {
  let finalPrice = basePrice
  if (discount) {
    discount = basePrice * (1 - discount)
    finalPrice = basePrice - discount
  }

  if (tax) {
    tax = finalPrice * (1 - tax)
    finalPrice = finalPrice + tax
  }

  if (processingFee) {
    finalPrice + processingFee
  }

  return {
    basePrice,
    discount,
    tax,
    finalPrice,
    processingFee,
  }
}

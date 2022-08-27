import useSWR, { SWRConfiguration } from "swr"
import {
  completePaypalOrder,
  completeSolanaOrder,
  createPaypalOrder,
  createSolanaOrder,
  getTest,
  getTestProtected,
} from "./fetchers/query"

const useSWRBuilder = <T>(
  key: Array<any> | string,
  fetcher: (...values: any) => Promise<T>,
  config?: SWRConfiguration
) => {
  const { data, error, isValidating, mutate } = useSWR(key, fetcher, config)

  return {
    data,
    isLoading: !error && !data,
    error,
    isValidating,
    mutate,
  }
}

export const useCreatePaypalOrder = (config?: SWRConfiguration) => {
  return useSWRBuilder(
    "/subscriptions/paypal/create",
    createPaypalOrder,
    config
  )
}

export const useCompletePaypalOrder = (
  invoiceID: string,
  config?: SWRConfiguration
) => {
  return useSWRBuilder(
    [`/subscriptions/paypal/${invoiceID}/complete`],
    completePaypalOrder,
    config
  )
}

export const useCreateSolanaOrder = (config?: SWRConfiguration) => {
  return useSWRBuilder(
    `/subscriptions/solana/create`,
    createSolanaOrder,
    config
  )
}

export const useCompleteSolanaOrder = (
  invoiceID: string,
  config?: SWRConfiguration
) => {
  return useSWRBuilder(
    [`/subscriptions/solana/${invoiceID}/complete`],
    completeSolanaOrder,
    config
  )
}

export const useTest = (config?: SWRConfiguration) => {
  return useSWRBuilder("/test", getTest, config)
}

export const useTestProtected = (config?: SWRConfiguration) => {
  return useSWRBuilder(["/test/protected", "ide"], getTestProtected, config)
}

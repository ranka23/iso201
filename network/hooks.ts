import useSWR, { SWRConfiguration } from "swr"
import {
  getTest,
  getTestProtected,
} from "./fetchers/query"

const useSWRBuilder = <T>(
  key: Array<any> | string,
  fetcher: (...values: any) => Promise<T>,
  config?: SWRConfiguration
) => {
  const { data, error, isValidating, mutate } = useSWR<T>(key, fetcher, config)

  return {
    data,
    isLoading: !error && !data,
    error,
    isValidating,
    mutate,
  }
}

export const useTest = (config?: SWRConfiguration) => {
  return useSWRBuilder("/test", getTest, config)
}

export const useTestProtected = (config?: SWRConfiguration) => {
  return useSWRBuilder(["/test/protected", "ide"], getTestProtected, config)
}

import useSWR, { SWRConfiguration } from "swr"
import {
  getAssetStat,
  getTest,
  getTestProtected,
  hasUserLikedAsset,
} from "./fetcher"

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

export const useAssetStats = (id: number, config?: SWRConfiguration) => {
  return useSWRBuilder([`/assets/${id}/stats`], getAssetStat, config)
}

export const useHasUserLikedAsset = (assetID: number, config?: SWRConfiguration) => {
  return useSWRBuilder(
    [`/assets/${assetID}/likes/`],
    hasUserLikedAsset,
    config
  )
}

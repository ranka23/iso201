import { AxiosResponse } from "axios"
import { get, post } from "services/axios"

export const getTest = async (url: string) => {
  try {
    const res = await get(url)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getTestProtected = async (url: string) => {
  try {
    const res = await get(url)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getAssetStat = async (url: string) => {
  try {
    const res = await get<{
      id: number
      likes: number
      views: number
    }>(url)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const mutateAssetStat = async (
  url: string,
  data: { assetID: number | string; updateValue: "view" | "like" }
) => {
  try {
    const res = await post<{
      id: number
      likes: number
      views: number
    }>(url, data)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

export const hasUserLikedAsset = async (url: string) => {
  try {
    const res = await get<{ hasLiked: boolean }>(url)
    return res.data
  } catch (error: any) {
    throw new Error(error)
  }
}

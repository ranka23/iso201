import { get } from "services/axios"

export const getTest = async (url: string) => {
  const res = await get(url)
  return res.data
}

export const getTestProtected = async (url: string) => {
  const res = await get(url)
  return res.data
}

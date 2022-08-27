import { get } from "services/axios"

export const getTest = async (url: string) => {
  const res = await get(url)
  return res.data
}

export const getTestProtected = async (url: string) => {
  const res = await get(url)
  return res.data
}

export const createPaypalOrder = async (url: string) => {
  const res = await get<{ invoiceID: string; order: { id: string } }>(url)
  return res.data
}

export const completePaypalOrder = async (url: string) => {
  const res = await get<{ id: string }>(url)
  return res.data
}

export const completeSolanaOrder = async (url: string) => {
  const res = await get<{ message: string }>(url)
  return res.data
}

export const createSolanaOrder = async (url: string) => {
  const res = await get<{ id: string }>(url)
  return res.data
}

import axios, { AxiosRequestConfig } from "axios"

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v0",
  headers: {
    "Content-Type": "application/json",
  },
})

export const get = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  options?: AxiosRequestConfig
) => {
  const params = new URLSearchParams(queryParams).toString()
  return instance.get<T>(`${url}?${params}`, options)
}

export const post = async <T>(url: string, data?: any, options?: AxiosRequestConfig) => {
  return instance.post<T>(url, data, options)
}

export default instance

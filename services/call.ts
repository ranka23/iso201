import axios, { AxiosRequestConfig } from "axios"
import createAuthRefreshInterceptor from "axios-auth-refresh"

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
})

const refreshAuth = async () => {
  console.log("AUTH REFRESH CALLED")
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/auth/refresh`
    )
    if (response.data.message === "success") {
      return Promise.resolve()
    }
    Promise.reject()
  } catch (err: any) {
    Promise.reject()
  }
}

createAuthRefreshInterceptor(instance, refreshAuth, {
  statusCodes: [498, 403],
})

export const get = async <T>(
  url: string,
  queryParams?: Record<string, string>,
  options?: AxiosRequestConfig
) => {
  const params = new URLSearchParams(queryParams).toString()
  return instance.get<T>(`${url}?${params}`, options)
}

export const post = async <T>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig
) => {
  return instance.post<T>(url, data, options)
}

export default instance

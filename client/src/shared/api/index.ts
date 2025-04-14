import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { type Error } from '../config'

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const $axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

$axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = token ? `Bearer ${token}` : undefined
  return config
})

$axios.interceptors.response.use(
  (config) => config,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig
    const data = error.response?.data as Error

    if (
      error.response?.status === 401 &&
      data.additionalData?.isNeedRefresh &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true

      try {
        const response = await $axios.post('/auth/refresh')
        localStorage.setItem('token', response.data.accessToken)
        return $axios(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default $axios

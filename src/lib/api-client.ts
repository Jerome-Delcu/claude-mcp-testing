import axios, { AxiosError, type AxiosInstance } from 'axios'

import { env } from '@/config/env'

export class ApiError extends Error {
  readonly status?: number
  readonly data?: unknown

  constructor(message: string, status?: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined
    return new ApiError(
      data?.message ?? error.message,
      error.response?.status,
      error.response?.data,
    )
  }
  if (error instanceof Error) return new ApiError(error.message)
  return new ApiError('Unknown error')
}

export function createApiClient(baseURL: string = env.apiBaseUrl): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 15_000,
    headers: { 'Content-Type': 'application/json' },
  })

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  )

  return client
}

export const apiClient = createApiClient()

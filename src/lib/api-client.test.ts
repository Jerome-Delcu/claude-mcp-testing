import { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

import { ApiError, createApiClient, toApiError } from '@/lib/api-client'

type RequestHandler = {
  fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
}

describe('createApiClient', () => {
  afterEach(() => localStorage.clear())

  it('uses the given base URL', () => {
    expect(createApiClient('https://example.test').defaults.baseURL).toBe('https://example.test')
  })

  it('attaches the bearer token when present', () => {
    localStorage.setItem('access_token', 'abc')
    const client = createApiClient('https://example.test')
    const [handler] = (client.interceptors.request as unknown as { handlers: RequestHandler[] })
      .handlers

    const config = handler.fulfilled({ headers: new AxiosHeaders() })
    expect(config.headers.Authorization).toBe('Bearer abc')
  })
})

describe('toApiError', () => {
  it('maps axios errors using the response message and status', () => {
    const error = new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Not here' },
      headers: {},
      config: { headers: new AxiosHeaders() },
    })

    const apiError = toApiError(error)
    expect(apiError).toBeInstanceOf(ApiError)
    expect(apiError.message).toBe('Not here')
    expect(apiError.status).toBe(404)
  })

  it('wraps unknown values', () => {
    expect(toApiError('boom').message).toBe('Unknown error')
  })
})

import { TokenService } from '@/services/token-service'
import LanguageService from '@/services/language-service'
import { OptionsInterceptors } from '~/models/OptionsInterceptors'

interface ParamsRequest {
  [key: string]: string | number | boolean | object
}

const defaultEndpoint = () => {
  return useRuntimeConfig().public.apiBase
}

export class RequestApiConfig {
  apiBase: string

  constructor (apiBase: string = defaultEndpoint()) {
    this.apiBase = apiBase
  }

  async api (url: string, params: object, upload = false) {
    const token = TokenService.getToken()
    const header = {
      'X-LANG': LanguageService.getLanguage() ?? 'en',
      Accept: 'application/json, text/plain, */*'
    }
    if (!upload) {
      header['Content-Type'] = 'application/json'
    }
    const opts = {
      key: url,
      baseURL: this.apiBase,
      headers: header,
      immediate: true,
      server: false,
      initialCache: false,

      onRequest ({ options }: OptionsInterceptors) {
        options.headers = options.headers || {}

        if (token) {
          options.headers['x-access-token'] = token
          options.headers.Authorization = 'Bearer ' + token
        }
      },

      onRequestError ({ error }: OptionsInterceptors) {
        console.log(error.message)
      },

      onResponseError ({ response }: OptionsInterceptors) {
        console.log(response._data.message)
      },
      onResponse ({ response }: OptionsInterceptors) {
        response._data = _cloneDeep(response._data)
      },

      ...params
    }
    const response: object | any = await useFetch(url, opts)
    return _cloneDeep(response.data.value)
  }

  get (url: string, query: ParamsRequest = {}, params: ParamsRequest = {}) {
    params.method = 'get'
    params.query = query
    return this.api(url, params)
  }

  post (url: string, body: ParamsRequest = {}, params: ParamsRequest = {}) {
    params.method = 'post'
    params.body = body
    return this.api(url, params)
  }

  postUpload (url: string, body: any, params: ParamsRequest = {}) {
    params.method = 'post'
    params.body = body
    return this.api(url, params, true)
  }
}

const RequestApi = {
  get (url: string, query: ParamsRequest = {}, params: ParamsRequest = {}) {
    return new RequestApiConfig().get(url, query, params)
  },

  post (url: string, body: ParamsRequest = {}, params: ParamsRequest = {}) {
    return new RequestApiConfig().post(url, body, params)
  },

  postUpload (url: string, body: any, params: ParamsRequest = {}) {
    return new RequestApiConfig().postUpload(url, body, params)
  }
}

export default RequestApi

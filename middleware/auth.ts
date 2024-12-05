import { getToken } from '~/services/token-service'
import AuthService from '~/services/auth-service'

const STATUS_INACTIVE = 0
const WHITELIST = ['/login', '/register', '/reset-password', '/change-password']
const AUTH_PAGES = ['/profile', '/profile/', '/merchant', '/merchant/']

export default defineNuxtRouteMiddleware(async (to) => {
  const token: string | undefined = getToken()
  const { path } = to
  const isNeedAuth = AUTH_PAGES.includes(path)
  if ((_isNil(token) || _isEmpty(token)) && isNeedAuth) {
    return navigateTo('/login')
  }
  if (process.client) {
    const checkAuth = async (resolver) => {
      const user = await AuthService.initAuth()
      let nextPath
      if (to.path !== '/' && to.path.endsWith('/')) {
        nextPath = to.path.replace(/\/+$/, '') || '/'
      } else {
        nextPath = to.path
      }
      if (token && user && user.status === STATUS_INACTIVE && nextPath !== '/otp') {
        window.location.href = '/otp'
      } else if (token && WHITELIST.includes(nextPath)) {
        window.location.href = '/'
      }
      resolver(user)
    }
    const fetchTokens = async (resolver) => {
      resolver()
    }
    const promises = [new Promise(checkAuth), new Promise(fetchTokens)]
    await Promise.all(promises)
  }
})

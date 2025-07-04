import { useIsLogin } from '~/composables/use-is-login'
import { getToken } from '~/services/token-service'
import { initAuth } from '~/services/auth-service'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  const WHITELIST = ['login', 'register']
  const AUTH_PAGES = ['index', 'profile']
  const { name: namePage } = to
  const isNeedAuth = AUTH_PAGES.includes(namePage)
  const token = getToken()
  if ((_isNil(token) || _isEmpty(token)) && isNeedAuth) {
    return navigateTo('/login')
  }
  if (!useIsLogin() && !!token) {
    if (WHITELIST.includes(namePage)) {
      return navigateTo('/')
    }
    else {
      await initAuth()
    }
  }
})

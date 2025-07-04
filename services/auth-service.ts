import RequestApi from '~/utils/request'
import { useAuthenticationStore } from '~/store/authentication'
import { TokenService } from '~/services/token-service'
import NotificationService from '~/services/noti-service'
import LoadingService from '~/services/loading-service'
import appStore from '~/store/app'

const AuthService = {
  login(data: any) {
    return RequestApi.post('auth/login', data)
  },
  register(data: any) {
    return RequestApi.post('auth/register', data)
  },
  logout() {
    return RequestApi.post('auth/logout')
  },
  me() {
    return RequestApi.get('auth/me', {})
  },
  async initAuth() {
    const store = useAuthenticationStore()
    const response = await this.me()
    if (response.status_code === 200) {
      store.setUser(response.data)
      store.setIsLoggedIn(true)
      return response.data
    }
    else {
      store.setUser(null)
      store.setIsLoggedIn(false)
      return null
    }
  },
  async handleLogout() {
    try {
      LoadingService.startLoading()
      const res = await this.logout()
      if (res.status_code !== 200) {
        NotificationService.setErrorNotification(res.message)
        return
      }
      TokenService.removeToken()
      const store = useAuthenticationStore()
      store.setIsLoggedIn(false)
      store.setUser(null)
      await useRouter().push({ path: '/', force: true })
    }
    catch (e) {
    }
    finally {
      LoadingService.stopLoading()
    }
  },
}
export const { initAuth } = AuthService
export default AuthService

import RequestApi from '~/utils/request'
import { authenticationStore } from '~/store/authentication'
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
  confirmOTP(code: string) {
    return RequestApi.post('auth/confirm-otp', { code })
  },
  resendOTP() {
    return RequestApi.post('auth/resend-otp')
  },
  forgotPassword(data: any) {
    return RequestApi.post('forgot-password', data)
  },
  changePassword(data: any) {
    return RequestApi.post('forgot-password/reset-password', data)
  },
  updateProfile(data: any) {
    return RequestApi.post('auth/me', data)
  },
  changePasswordV2(data: any) {
    return RequestApi.post('auth/change-password', data)
  },
  async initAuth() {
    const store = authenticationStore()
    const response = await this.me()
    if (response.status_code === 200) {
      store.setUser(response.data)
      store.setIsLoggedIn(true)
      return response.data
    } else {
      store.setUser(null)
      store.setIsLoggedIn(false)
      return null
    }
  },
  connectAthena(data: any) {
    return RequestApi.post('auth/connect-ath', data)
  },
  getQR2FA() {
    return RequestApi.get('auth/2fa')
  },
  enable2FA(data) {
    return RequestApi.post('auth/enable-2fa', data)
  },
  disable2FA(data) {
    return RequestApi.post('auth/disable-2fa', data)
  },
  sendOTP2FA() {
    return RequestApi.post('auth/2fa-send-otp')
  },
  getUserInfo(id) {
    return RequestApi.get(`users/${id}`)
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
      const store = authenticationStore()
      store.setIsLoggedIn(false)
      store.setUser(null)
      await useRouter().push({ path: '/', force: true })
    } catch (e) {
    } finally {
      LoadingService.stopLoading()
    }
  },
  getRefs(query = {}) {
    return RequestApi.get('auth/list-referral', query)
  },
  checkLogin(data) {
    return RequestApi.post('auth/check-login', data)
  },
  resendOTPLogin(query) {
    return RequestApi.post('auth/resend-otp-login', query)
  },
  async fetchWalletAssets() {
    const res = await RequestApi.get('user/asset')
    if (res.status_code === 200) {
      const { data } = res
      data.forEach((token) => {
        token.balance_usdt = token?.value * token?.rate
      })
      appStore().setWalletAssets(data)
    }
  },
  sendOTPSendToken() {
    return RequestApi.post('auth/resend-otp')
  },
  createWalletAddress() {
    return RequestApi.post('auth/create-blockchain-wallet')
  },
  sendOTPAddLP(data) {
    return RequestApi.post('farms/resend-otp', data)
  },
}
export default AuthService

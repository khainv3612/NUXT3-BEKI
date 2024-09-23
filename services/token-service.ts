import Cookie from 'js-cookie'

const key = 'access_token'
const keyIsLoggedIn = 'is_logined'

export class TokenService {
  static getToken (): string | null | undefined {
    return useCookie(key).value
  }

  static setToken (token: string): void {
    Cookie.set(key, token)
  }

  static removeToken (): void {
    Cookie.remove(key)
  }

  static setIsLoggedIn (isLoggedIn: string): void {
    Cookie.set(keyIsLoggedIn, isLoggedIn)
  }

  static getIsLoggedIn () {
    return useCookie(keyIsLoggedIn).value
  }
}

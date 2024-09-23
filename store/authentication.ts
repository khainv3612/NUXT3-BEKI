import { defineStore } from 'pinia'
import { TokenService } from '~/services/token-service'
import { KEY_LOGGED_IN } from '~/utils/constants'

export const authenticationStore = defineStore('authentication', {
  state: () => {
    return {
      user: null,
      isLoggedIn: false
    }
  },
  actions: {
    setUser (user: any) {
      this.user = user
    },
    setIsLoggedIn (isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn
      TokenService.setIsLoggedIn(isLoggedIn ? KEY_LOGGED_IN.loggedIn : KEY_LOGGED_IN.notLoggedIn)
    }
  }
})

import { useAuthenticationStore } from '~/store/authentication'

export function useIsLogin() {
  const result = computed(() => {
    return !_isNil(useAuthenticationStore().user) && !_isEmpty(useAuthenticationStore().user)
  })
  return result.value
}

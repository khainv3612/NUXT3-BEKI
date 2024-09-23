export function useMaintained() {
  const config = useRuntimeConfig()
  const result = computed(() => {
    if (config.public.isMaintained && config.public.isMaintained.toString() === '1') return true
    return false
  })
  return result.value
}

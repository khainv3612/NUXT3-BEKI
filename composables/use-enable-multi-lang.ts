export function useEnableMultiLang() {
  const config = useRuntimeConfig()
  const result = computed(() => {
    return config.public.enableMultiLang && config.public.enableMultiLang.toString() === '1'
  })
  return result.value
}

import moment from 'moment'
import NotificationService from '~/services/noti-service'
import { authenticationStore } from '~/store/authentication'
import { AMOUNT_DIGIT, PI_TOKEN } from '~/utils/constants'
import { formatCoinEn, sliceNumber, sliceNumberToStr } from '~/utils/functions'
import appStore from '~/store/app'
import AuthService from '~/services/auth-service'
import LoadingService from '~/services/loading-service'

export function getImg(path: string) {
  return new URL(`../assets/images/${path}`, import.meta.url)
}

export function getIcon(path: string) {
  return new URL(`../assets/icons/${path}`, import.meta.url)
}

export const trans = (key: string, params: any = []) => {
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n
  return i18n.t(key, params)
}

export function genNonce(length = 32) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function checkRejectFromWallet(err: any) {
  if (
    err.message.toLowerCase().match(/user rejected transaction/i) ||
    err.message.toLowerCase().match(/user rejected the transaction/i) ||
    err.message.toLowerCase().match(/user denied transaction/i) ||
    err.message.toLowerCase().match(/user rejected signing/i) ||
    err.message.toLowerCase().match(/rejected the request/i)
  ) {
    NotificationService.setErrorNotification('You rejected the request in your wallet')
    return true
  }
  return false
}

export function formatWalletAddress(address: string, type = 1) {
  if (!address) {
    return null
  }
  switch (type) {
    case 1:
      return address.slice(0, 6) + '...' + address?.slice(-4)
    case 2:
      return address.slice(0, 6) + '...' + address?.slice(-2)
  }
}

export const compactEmail = (email, maxLength = 6) => {
  if (!email) {
    return null
  }
  const lastIndex = email.lastIndexOf('@')
  let prefix = email.substring(0, lastIndex)
  const suffix = email.substring(lastIndex)
  if (prefix.length > maxLength) {
    prefix = prefix.slice(0, Math.floor(maxLength / 2)) + '...' + prefix?.slice(-1 * Math.floor(maxLength / 2))
  }
  return prefix + suffix
}

export function copyValue(text: string, isShowNoti = true) {
  unsecuredCopyToClipboard(text, isShowNoti)
}

const unsecuredCopyToClipboard = (text, isShowNoti) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand('copy')
    if (isShowNoti) {
      NotificationService.setSuccessNotification(trans('common.copy_success'))
    }
  } catch (err) {
    console.error('Unable to copy to clipboard', err)
  }
  document.body.removeChild(textArea)
}

export function onlyDigit(input) {
  input = input.toString().replaceAll(',', '.')
  input = input.toString().replace(/[^0-9.]/g, '')
  const dotCount = input.split('.').length - 1
  if (dotCount > 1) {
    input = input.slice(0, -1)
  }
  return input
}

export function onlyDigitWithDecimal(input, decimal = AMOUNT_DIGIT) {
  input = input.toString().replaceAll(',', '.')
  input = input.toString().replace(/[^0-9.]/g, '')
  const strArr = input.split('.')
  const dotCount = strArr.length - 1
  if (dotCount > 1) {
    input = input.slice(0, -1)
  }
  if (strArr.length <= 1 || !decimal) {
    return input
  }
  input = `${strArr[0]}.${strArr[1].slice(0, decimal - 1)}`
  return input
}

export function onlyDigitWithMaxDecimal(input, decimal = AMOUNT_DIGIT) {
  input = input.toString().toLocaleString('fullwide', {
    useGrouping: false
  }).replaceAll(',', '.')
  input = input.toString().replace(/[^0-9.]/g, '')
  const strArr = input.split('.')
  if (strArr.length <= 1 || !decimal) {
    return input
  }
  const dotCount = strArr.length - 1
  if (dotCount > 1) {
    input = input.slice(0, -1)
  }
  input = `${strArr[0]}.${strArr[1].slice(0, decimal - 1)}`
  return input
}

export function eToNumber(num) {
  let sign = '';
  (num += '').charAt(0) == '-' && (num = num.substring(1), sign = '-')
  const arr = num.split(/[e]/ig)
  if (arr.length < 2) {
    return sign + num
  }
  const dot = (0.1).toLocaleString().substr(1, 1)
  let n = arr[0]
  const exp = +arr[1]
  let w = (n = n.replace(/^0+/, '')).replace(dot, '')
  const pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp
  let L = pos - w.length
  w = w.replace('.', '')
  const s = '' + BigInt(w)
  w = exp >= 0 ? (L >= 0 ? s + '0'.repeat(L) : r()) : (pos <= 0 ? '0' + dot + '0'.repeat(Math.abs(pos)) + s : r())
  L = w.split(dot)
  if (L[0] == 0 && L[1] == 0 || (+w == 0 && +s == 0)) {
    w = 0
  }
  return (sign + w).replace(',', '.')

  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`)
  }
}

export function formatScientificNumber(value) {
  return value.toString().includes('e') ? eToNumber(value) : formatCoinEn(value)
}

export function formatScientificPrice(value, digit = AMOUNT_DIGIT) {
  return value.toString().includes('e') ? sliceNumberToStr(eToNumber(value), digit) : validateNumberInput(value, digit)
}

export const checkLogin = () => {
  const user = authenticationStore().user
  if (_isNil(user) || _isEmpty(user)) {
    navigateTo('/login')
    return false
  }
  return true
}

export const scrollToElHorizontal = (el) => {
  const elRight = el.offsetLeft + el.offsetWidth
  const elLeft = el.offsetLeft

  const elParentRight = el.parentNode.offsetLeft + el.parentNode.offsetWidth
  const elParentLeft = el.parentNode.offsetLeft

  if (elRight > elParentRight + el.parentNode.scrollLeft) {
    el.parentNode.scrollLeft = elRight - elParentRight
  } else if (elLeft < elParentLeft + el.parentNode.scrollLeft) {
    el.parentNode.scrollLeft = elLeft - elParentLeft
  }
}
export const checkFormNotPassValidated = (form) => {
  const isHasInvalidField = Object.values(form).includes(false)
  return isHasInvalidField
}

export const calcFileSize = (filesize) => {
  if (!filesize) {
    return 0
  }
  if (filesize / 1024 < 1024) {
    return `${sliceNumber(filesize / 1024)}KB`
  }
  return `${sliceNumber(filesize / 1024 / 1024)}MB`
}

export const isPiToken = (token) => {
  return token.id === PI_TOKEN.id && token.symbol === PI_TOKEN.symbol
}
export const getTextLangOneOrMany = (count, textOne, textMany) => {
  if (getCurrentLang() === 'en') {
    return Number(count ?? 0) > 1 ? textMany : textOne
  }
  return textOne
}

export const getCurrentLang = () => {
  const store = appStore()
  if (store.currentLang) {
    return store.currentLang
  }
  const nuxtApp = useNuxtApp()
  const i18n = nuxtApp.$i18n
  return i18n.locale.value ?? useRuntimeConfig().public.DEFAULT_LANG
}

export const addPiToken = (listToken) => {
  const isHasPi = listToken.some(token => isPiToken(token))
  if (!isHasPi) {
    listToken.push(PI_TOKEN)
  }
}


export function getPublicResources(path: string) {
  return new URL(`../public/${path}`, import.meta.url)
}

export async function fetchAssetsBalance(cb = []) {
  const promises = [AuthService.initAuth()].concat(cb)
  return await Promise.all(promises)
}

export const validateNumberInput = (value, digit = AMOUNT_DIGIT) => {
  if (!value) {
    return ''
  }
  value = onlyDigitWithMaxDecimal(value, digit)
  return value
}

export const convertToFloat = (num) => {
  if (!num) {
    return num
  }
  num = num.toString().toLowerCase()
  if (num.includes('e')) {
    const e = num.split('-')[1]
    return Number.parseFloat(num).toFixed(e)
  }
  return num
}

export function convertToLocalDate(utcDateString: string, format: string = '') {
  // eslint-disable-next-line import/no-named-as-default-member
  const utcDate = moment.utc(utcDateString)
  const localDate = utcDate.local()
  if (format) {
    return localDate.format(format).toString()
  }
  return localDate
}

export function joinString(str) {
  return str.split(/\s+/).join('-')
}

export async function refreshPage() {
  try {
    LoadingService.startLoading()
    await refreshNuxtData()
  } catch (error) {
  } finally {
    LoadingService.stopLoading()
  }
}

export const handleClickToken = (token) => {
  if (useDisableTokens().includes(token.id.toString())) {
    NotificationService.setWarningNotification(trans('coming_soon'))
    return false
  }
  if (token.isTemp) {
    NotificationService.setWarningNotification(trans('coming_soon'))
    return false
  }
  return true
}

export function toPlainString(num) {
  return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function(a, b, c, d, e) {
    return e < 0 ? b + '0.' + Array(1 - e - c.length).join(0) + c + d : b + c + d + Array(e - d.length + 1).join(0)
  })
}

export function isIOS() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  return /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor || (window.opera && opera.toString() === '[object Opera]'))
}

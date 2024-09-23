import { DIGIT_DEFAULT, TYPE_PRICE_FLUCTUATION } from '~/utils/constants'
import appStore from '~/store/app'

export const formatCoinEn = (number: any, digit = DIGIT_DEFAULT) => {
  number = sliceNumber(number, digit)
  return number
    ? new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 6
    }).format(number)
    : number
}
export const formatCoinEnDecimal = (number: any, digit = DIGIT_DEFAULT) => {
  number = sliceNumber(number, digit)
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 6
  })
    .format(number)
    .toString()
    .slice(1)
  const dotIndex = value.indexOf('.')
  return number % 1 === 0 ? value.substring(0, dotIndex) : value
}

export const formatCointoFix4 = (number: number | string, type = 1) => {
  number = toNumber(number)
  const dotIndex = number.toString().indexOf('.')
  if (dotIndex !== -1) {
    const value = parseFloat(number.toString().substring(0, dotIndex + 5))
    return type === 1 ? formatCoinEnDecimal(value) : formatCoinEn(value)
  } else {
    return type === 1 ? formatCoinEnDecimal(number) : formatCoinEn(number)
  }
}

export const formatNumber = (number: string) => {
  if (!number) {
    return ''
  }
  const arr = number.toString().split('.')
  if (arr.length === 1) {
    return parseInt(arr[0])
  }
  return parseInt(arr[0]) + '.' + (arr[1] ? parseInt(arr[1]) : '')
}
export const sliceNumber = (number, digit = 5) => {
  if (!number) {
    return number
  }
  number = number.toString()
  const strArr = number.split('.')
  if (strArr.length > 1) {
    number = strArr[0] + '.' + strArr[1].slice(0, digit)
  }
  number = Number(number)
  return number
}
export const sliceNumberToStr = (number, digit = 5) => {
  if (!number) {
    return number
  }
  number = number.toString()
  const strArr = number.split('.')
  if (strArr.length > 1) {
    number = strArr[0] + '.' + strArr[1].slice(0, digit)
  }
  return number
}
export const updatePriceFluctuations = (openPrice, closePrice) => {
  const buffer = +closePrice - +openPrice
  appStore().setPriceFluctuations(
    buffer === 0 ? TYPE_PRICE_FLUCTUATION.BALANCE : buffer > 0 ? TYPE_PRICE_FLUCTUATION.INCREASE : TYPE_PRICE_FLUCTUATION.DECREASE
  )
}

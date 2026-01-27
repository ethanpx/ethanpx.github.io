import { type HTMLAttributeAnchorTarget, useCallback, useEffect, useRef } from 'react'
import numbro from 'numbro'



/**
 * Wrapped Numbro - https://numbrojs.com/old-format.html
 * @param value Value
 * @returns
 */
export const numeric = (
  value?: number | string | bigint,
): ReturnType<typeof numbro> => {
  if (!value) return numbro('0')
  return numbro(value)
}

/**
 * @argument address input address.
 * @argument maxLength @type @number - max character on the first and last result string.
 * @argument symbol - the symbol visible instead character
 * */
type ShortenStringOtp = {
  maxLength?: number
  symbol?: string
  suffix?: boolean
}
export const shortenString = (string: string, options?: ShortenStringOtp) => {
  const maxLength = options?.maxLength || 3
  const symbol = options?.symbol || '...'
  const suffix = options?.suffix !== undefined ? options.suffix : true

  if (!string || string.length <= maxLength * 2) return string
  const txtSuffix = `${symbol}${string.substring(string.length - maxLength)}`
  return `${string.substring(0, maxLength)}${suffix ? txtSuffix : ''}`
}

export const asyncWait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 *  useTimeoutFn function
 * @param void - void function
 * @param ms - milliseconds
 * @returns
 */
export const useTimeoutFn = (fn: () => void, ms: number) => {
  const ready = useRef<boolean | null>(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
  const callback = useRef(fn)

  const isReady = useCallback(() => ready.current, [])

  const set = useCallback(() => {
    ready.current = false
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    timeout.current && clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      ready.current = true
      callback.current()
    }, ms)
  }, [ms])

  const clear = useCallback(() => {
    ready.current = null
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    timeout.current && clearTimeout(timeout.current)
  }, [])

  // update ref when function changes
  useEffect(() => {
    callback.current = fn
  }, [fn])

  // set on mount, clear on unmount
  useEffect(() => {
    set()

    return clear
  }, [clear, ms, set])

  return [isReady, clear, set]
}
/**
 *  useTimeoutFn function
 * @param void - void function
 * @param ms - milliseconds
 * @param deps - dependencies
 * @returns
 */
export const useDebounce = (fn: () => void, ms: number, deps: any[]) => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, deps)

  return [isReady, cancel]
}

export const arrayToMap = <T>(array: T[], key: keyof T) => {
  const map = new Map<string, T>()
  array.forEach((item) => {
    if (item?.[key]) map.set(item[key] as string, item)
  })
  return map
}

export const formatUiNumber = (
  num: number | string | undefined,
  format?: string,
) => {
  if (format) return numeric(num).format(format)
  if (!num || !Number(num)) return '0'
  if (Number(num) < 0.001) return '<0.001'
  if (Number(num) > 100) return numeric(num).format('0,0.[0]')
  if (Number(num) > 10) return numeric(num).format('0,0.[00]')
  return numeric(num).format('0,0.[000]')
}

export const roundToNineDecimals = (num: number) => {
  return parseFloat(num.toFixed(9))
}

export const randomFromToInt = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function customFromNow(createAt: string) {
  const now = new Date()
  const createdAtDate = new Date(createAt)
  const diffInSeconds = Math.floor(
    (now.getTime() - createdAtDate.getTime()) / 1000,
  )

  const secondsInMinute = 60
  const secondsInHour = secondsInMinute * 60
  const secondsInDay = secondsInHour * 24
  const secondsInWeek = secondsInDay * 7
  const secondsInMonth = secondsInDay * 30
  const secondsInYear = secondsInDay * 365

  if (diffInSeconds < secondsInMinute) {
    return '1m'
  } else if (diffInSeconds < secondsInHour) {
    return Math.floor(diffInSeconds / secondsInMinute) + 'm'
  } else if (diffInSeconds < secondsInDay) {
    return Math.floor(diffInSeconds / secondsInHour) + 'h'
  } else if (diffInSeconds < secondsInWeek) {
    return Math.floor(diffInSeconds / secondsInDay) + 'd'
  } else if (diffInSeconds < secondsInMonth) {
    return Math.floor(diffInSeconds / secondsInWeek) + 'w'
  } else if (diffInSeconds < secondsInYear) {
    return Math.floor(diffInSeconds / secondsInMonth) + 'mo'
  } else {
    return Math.floor(diffInSeconds / secondsInYear) + 'y'
  }
}

export function normalizeError(err: any): string {
  return err?.response?.data?.message || err?.message || 'Something went wrong'
}

export function biasedRandom() {
  const rand = Math.random()
  const adjustedRand = Math.pow(rand, 2)
  return adjustedRand
}

export function getCurrentHourInUTC() {
  return new Date().getUTCHours()
}

export const formatNumeric = (
  num: number | string | undefined,
  format?: string,
) => {
  if (format) return numeric(num).format(format)
  if (!num || !Number(num)) return '0'
  if (Number(num) > 100) return numeric(num).format('0,0.[0]')
  if (Number(num) > 10 || Number(num) < 0)
    return numeric(num).format('0,0.[00]')
  if (Number(num) < 0.001) return '<0.001'
  return numeric(num).format('0,0.[000]')
}

export const getCurrentWeekUTC = () => {
  const ONE_DAY = 24 * 60 * 60 * 1000
  const now = new Date()
  const firstDay = new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
  const dayOfYear =
    Math.floor((now.getTime() - firstDay.getTime()) / ONE_DAY) + 1
  const currentWeek = Math.ceil((dayOfYear + firstDay.getUTCDay() - 1) / 7)

  return currentWeek
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(deepClone) as unknown as T
  return Object.keys(obj).reduce((acc, key) => {
    ; (acc as any)[key] = deepClone((obj as any)[key])
    return acc
  }, {} as T)
}

export const randomColor = (seed?: string, opacity?: string | number) => {
  let hash = Math.floor(Math.random() * 16777215)
  if (seed) {
    hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
    }
  }

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255

    value = Math.floor(150 + (value % 106))

    rgb[i] = value
  }

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity || 1})`
}

/** Forked from https://github.com/epoberezkin/fast-deep-equal */
export function deepEqual(a: any, b: any) {
  if (a === b) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false

    let length: number
    let i: number

    if (Array.isArray(a) && Array.isArray(b)) {
      length = a.length
      if (length !== b.length) return false
      for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false
      return true
    }

    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf()
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString()

    const keys = Object.keys(a)
    length = keys.length
    if (length !== Object.keys(b).length) return false

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]!)) return false

    for (i = length; i-- !== 0;) {
      const key = keys[i]

      if (key && !deepEqual(a[key], b[key])) return false
    }

    return true
  }
  // true if both NaN, false otherwise
  // biome-ignore lint/suspicious/noSelfCompare: <explanation>
  return a !== a && b !== b
}

export function openLink(
  url: string,
  target: HTMLAttributeAnchorTarget = '_blank',
) {
  return window.open(url, target)
}

export function randomizeAPR(apr: number) {
  const min = apr * 0.8
  const max = apr * 1.2
  const randomValue = Math.random() * (max - min) + min
  return Math.round(randomValue * 100) / 100
}

export function numericFormat(num: number, format?: numbro.Format) {
  if (!num) return 0
  const _format: numbro.Format = {
    thousandSeparated: true,
    mantissa: 2,
    optionalMantissa: true,
    trimMantissa: true,
    ...format,
  }
  return numeric(num).format(_format)
}

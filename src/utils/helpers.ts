import { BankInterface } from "@/shared"
import { DateRange } from "react-day-picker"

import moment from "moment"

import { RefObject } from "react"
import { iv } from "./constants"
import CryptoJS from "crypto-js"
import PBKDF2 from "crypto-js/pbkdf2"
import WordArray from "crypto-js/lib-typedarrays"
import Utf8 from "crypto-js/enc-utf8"
import { toast } from "@/components/ui/use-toast"
import dayjs from "dayjs"

export function removeDuplicateObjects(banks: BankInterface[]): any[] {
  // Helper function to check if two objects are equal
  function isEqual(obj1: BankInterface, obj2: BankInterface): boolean {
    return obj1.bankCode === obj2.bankCode && obj1.bankName === obj2.bankName
  }

  // Filter out duplicate objects
  const uniqueBanks = banks?.filter(
    (bank, index, self) => self.findIndex((obj) => isEqual(obj, bank)) === index
  )

  return uniqueBanks
}

interface Params {
  [key: string]: any
}

export function removeDuplicates<T>(arr: T[]): T[] {
  const uniqueMap: Record<string, boolean> = {}
  return arr.filter((item) => {
    const key = JSON.stringify(item)
    if (!uniqueMap[key]) {
      uniqueMap[key] = true
      return true
    }
    return false
  })
}

export function toastMessage(
  title: string,
  description: string,
  success: boolean = false
) {
  return toast({
    title: title,
    description: description,
    variant: "destructive",
    style: {
      backgroundColor: success ? "#01A66F" : "#f44336",
      color: "#fff",
      top: "20px",
      right: "20px",
    },
  })
}

export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function createSearchParams(params: Params): URLSearchParams {
  const searchParams = new URLSearchParams()

  Object.keys(params).forEach((param) => {
    const value = params[param]
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(param, item)
        })
      } else {
        searchParams.append(param, value)
      }
    }
  })

  return searchParams
}

export function formatDateToISOString(date: Date): string {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  const seconds = String(date.getUTCSeconds()).padStart(2, "0")
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
}

export const calculateNewDateRange = (selectedValue: string): DateRange => {
  const currentDate = new Date()
  const fromDate = new Date()

  switch (selectedValue) {
    case "0": // Today
      return {
        from: currentDate,
        to: currentDate,
      }
    case "1": // Tomorrow
      fromDate.setDate(currentDate.getDate() + 1)
      return {
        from: fromDate,
        to: fromDate,
      }
    case "3": // In 3 days
      fromDate.setDate(currentDate.getDate() + 3)
      return {
        from: fromDate,
        to: fromDate,
      }
    case "7": // In a week
      fromDate.setDate(currentDate.getDate() + 7)
      return {
        from: fromDate,
        to: fromDate,
      }
    default:
      return {
        from: currentDate,
        to: currentDate,
      }
  }
}

export const passwordHash = (password: string): string => {
  const fixedSalt = "myFixedSalt"
  const keySize = 256 / 32 // 256-bit key size
  const iterations = 1000

  // Derive an encryption key using PBKDF2
  const key = PBKDF2(password, fixedSalt, {
    keySize,
    iterations,
  })

  // Use the derived key for encryption
  return CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.CFB, // Choose an appropriate mode
    padding: CryptoJS.pad.Pkcs7, // Choose an appropriate padding
    iv: iv, // Use a fixed IV
  }).toString()
}

export function extractObjectUrlFromSignedUrl(signedUrl: string): string {
  const url = new URL(signedUrl)
  return url.origin + url.pathname
}

export function getMonthName(monthNumber: number): string | null {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]
  } else {
    return null
  }
}

export function getCurrentAndNextMonth(): {
  month_number: number
  month_name: string
}[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentDate = new Date()
  const currentMonthNumber = currentDate.getMonth() + 1 // Adding 1 because months are zero-indexed
  const currentMonthName = months[currentDate.getMonth()]

  let nextMonthNumber = currentMonthNumber + 1
  let nextYear = currentDate.getFullYear()

  if (nextMonthNumber === 13) {
    nextMonthNumber = 1
    nextYear += 1
  }

  const nextMonthName = months[nextMonthNumber - 1]

  return [
    { month_number: currentMonthNumber, month_name: currentMonthName },
    { month_number: nextMonthNumber, month_name: nextMonthName },
  ]
}

export function formatDateToISOStringWithMilliseconds(date: Date): string {
  const isoStringWithMilliseconds = date.toISOString().slice(0, -1) // Remove trailing 'Z'
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0")
  return `${isoStringWithMilliseconds}.${milliseconds}`
}

export function getCurrentMonthNumber(): number {
  const currentDate = new Date()
  const monthNumber = currentDate.getMonth() + 1
  return monthNumber
}

export function dateDifferenceInDays(date1: Date, date2: Date): number {
  const momentDate1 = moment(date1)
  const momentDate2 = moment(date2)

  // Calculate the difference in days
  const daysDifference = Math.abs(momentDate2.diff(momentDate1, "days"))

  return daysDifference
}

export function formatNumberToK(number: number): string {
  if (number >= 1000000) {
    const kValue = number / 1000000
    return kValue.toFixed(1) + "m"
  }
  if (number >= 1000) {
    const kValue = number / 1000
    return kValue.toFixed(1) + "k"
  } else {
    return number?.toString()
  }
}

export function getTimeAgoFromUTC(date: Date) {
  const utcDate = new Date(date)

  const currentDate = new Date()

  const timeDifference = currentDate.getTime() - utcDate.getTime()

  const isFuture = timeDifference < 0
  const timeDifferenceAbsolute = Math.abs(timeDifference)

  const secondsAgo = Math.floor(timeDifferenceAbsolute / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)

  if (isFuture) {
    return "recently"
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`
  } else {
    return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`
  }
}

export function convertDateToTime(
  dateObject: dayjs.Dayjs | null
): string | null {
  if (dateObject === null) {
    return null
  }

  return dateObject.format("HH:mm:ss")
}

export function convertDateString(input: string): string | null {
  const match = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (match) {
    const year = match[1]
    const month = match[2]
    const day = match[3]

    return `${month}/${day}`
  } else {
    return null
  }
}
export function generateMonthArray(numberOfDaysInMonth: number) {
  const daysOfMonth = []

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const dayObject = { day: i.toString(), id: i } // Adjusted to start from 0
    daysOfMonth.push(dayObject)
  }

  return daysOfMonth
}

export function formatDate(date?: Date): string {
  if (!date) {
    return "Invalid Date"
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

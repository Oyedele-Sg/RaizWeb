import { BankInterface } from "@/shared"
import { DateRange } from "react-day-picker"
import moment from "moment"

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

function formatDateToCustomFormat(inputDate: Date): string {
  const momentDate = moment(inputDate)
  if (!momentDate.isValid()) {
    return "Invalid Date"
  }

  return momentDate.format("YYYY-MM-DD")
}

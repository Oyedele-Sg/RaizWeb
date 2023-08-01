import { BankInterface } from "@/shared"

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



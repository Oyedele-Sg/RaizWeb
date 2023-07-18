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

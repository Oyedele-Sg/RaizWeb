import { BehaviorSubject } from "rxjs"
import { fetchWrapper } from "@/utils/fetchWrapper"
import { URL } from "@/utils/constants"
import { useRouter, redirect } from "next/navigation"
import {
  BankDataInterface,
  BankInterface,
  ExpenseChartInterface,
  IncomeSummarytDataInterface,
  LoginDataInterface,
  RegisterDataInterface,
  TransactiontDataInterface,
  UserInterface,
  UserSearchInterface,
  TransactionPinInterface,
  InternalDebitDataInterface,
  CategoryDataInterface,
  ExternalDebitDataInterface,
  RequestDataInterface,
} from "@/shared"
import { BankInputProps } from "@/components/profile-setup/AddBankForm"
import { createSearchParams } from "@/utils/helpers"

const baseUrl = `${URL}`
const storedUser =
  typeof window !== "undefined" ? sessionStorage.getItem("pesaToken") : null

const userSubject = new BehaviorSubject<any>(
  storedUser ? JSON.parse(storedUser) : null
)

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value
  },
  logout,
  // getUser,
  login,
  signup,
  verifyEmail,
  resendEmail,
  verifyBVN,
  verifyAuthToken,
  refreshAuthToken,
  getCurrentUser,
  verifyPhone,
  addPhoneToUser,
  refreshPhoneOTP,
  verifyVoiceOTP,
  refreshVoiceOTP,
  updateUserProfileImage,
  updateUsername,
  getBanks,
  addBank,
  CreateWallet,
  getRecentTransactions,
  getExpenseChart,
  getIncomeSummary,
  searchWallets,
  addTransactionPin,
  walletTransfer,
  getCategory,
  externalTransfer,
  requestFunds,
  loadFunds,
}
// auth
function login(data: LoginDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/login/`, data).then((user: any) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes

    userSubject.next(user)
    sessionStorage.setItem("pesaToken", JSON.stringify(user))
  })
}

function logout(): void {
  // remove user from local storage, publish null to user subscribers, and redirect to login page
  sessionStorage.removeItem("pesaToken")
  userSubject.next(null)

  // redirect("/login")
}

function signup(data: RegisterDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/signup/`, data)
}
function verifyEmail(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=email`, data)
}

function verifyPhone(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=phone`, data)
}

function verifyVoiceOTP(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=voice`, data)
}
function refreshVoiceOTP(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=voice`, data)
}

function refreshPhoneOTP(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=phone`, data)
}
function addPhoneToUser(data: {
  phone_number: string
  medium: string
}): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/phone_number/`, data)
}

function resendEmail(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=email`, data)
}

function verifyBVN(data: { bvn: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/bvn/verification/`, data)
}

// function forgotPassword(data): Promise<void> {
//   return fetchWrapper.post(`${baseUrl}/auth/forgot-password/`, data);
// }

// function resetPassword(data): Promise<void> {
//   return fetchWrapper.post(`${baseUrl}/auth/reset-password/`, data);
// }

function verifyAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-token/`, data)
}

function refreshAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper
    .post(`${baseUrl}/auth/refresh-token/`, data)
    .then((user: any) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      // ("user", user)
      userSubject.next(user)
      sessionStorage.setItem("pesaToken", JSON.stringify(user))
    })
}

// profile apis
function getCurrentUser(): Promise<UserInterface> {
  return fetchWrapper.get(`${baseUrl}/account_users/me/`)
}

function updateUserProfileImage(): Promise<UserInterface> {
  return fetchWrapper.get(`${baseUrl}/account_users/me/`)
}

function updateUsername(data: { username: string }): Promise<UserInterface> {
  return fetchWrapper.patch(`${baseUrl}/account_users/username/`, data)
}

// lookup
function getBanks(): Promise<BankDataInterface> {
  return fetchWrapper.get(`${baseUrl}/nip-lookup/banks/`)
}

function addBank(data: BankInputProps): Promise<void> {
  return fetchWrapper.post(
    `${baseUrl}/account_users/withdrawal_accounts/`,
    data
  )
}

function addTransactionPin(data: TransactionPinInterface): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/transaction-pin/`, data)
}

// wallet

function CreateWallet(): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/account_users/wallets/`, {})
}

// charts and graphs
export interface getRecentTransParams {
  start_date?: Date
  end_date?: Date
  limit?: number
  offset?: number
}
function getRecentTransactions(
  start_date?: string,
  end_date?: string,
  limit?: number,
  offset?: number
): Promise<TransactiontDataInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/recent-transactions/?${createSearchParams({
      start_date,
      end_date,
      limit,
      offset,
    })}`
  )
}

function getExpenseChart(
  start_date?: Date,
  end_date?: Date
): Promise<ExpenseChartInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/spend-chart/?${createSearchParams({
      start_date,
      end_date,
    })}`
  )
}

function getIncomeSummary(
  start_date?: Date,
  end_date?: Date
): Promise<IncomeSummarytDataInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/income-summary/?${createSearchParams({
      start_date,
      end_date,
    })}`
  )
}

function searchWallets(query?: string): Promise<UserSearchInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/search/wallets/?search=${query || ""}`
  )
}

// transfer

function walletTransfer(data: InternalDebitDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/debit/send-internal/`, data)
}
function externalTransfer(data: ExternalDebitDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/debit/send-internal/`, data)
}

// category
function getCategory(): Promise<CategoryDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/categories/`)
}

function requestFunds(data: RequestDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/credit/request-funds/`, data)
}

function loadFunds(): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/credit/load-account/`, {})
}

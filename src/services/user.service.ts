import { BehaviorSubject } from "rxjs"
import { fetchWrapper } from "@/utils/fetchWrapper"
import { URL } from "@/utils/constants"
import { redirect, useRouter } from "next/navigation"
import {
  LoginDataInterface,
  RegisterDataInterface,
  UserInterface,
  UserTypeinterface,
} from "@/shared"

const baseUrl = `${URL}`
const storedUser =
  typeof window !== "undefined" ? localStorage.getItem("pesaToken") : null
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
}
// auth
function login(data: LoginDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/login/`, data).then((user: any) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes
    console.log("user", user)
    userSubject.next(user)
    localStorage.setItem("pesaToken", JSON.stringify(user))
  })
}

function logout(): void {
  // remove user from local storage, publish null to user subscribers, and redirect to login page
  localStorage.removeItem("pesaToken")
  userSubject.next(null)
  useRouter().push("/login")
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

function refreshPhoneOTP(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=phone`, data)
}
function addPhoneToUser(data: { phone_number: string }): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/phone_number/`, data)
}

function resendEmail(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=email`, data)
}

function verifyBVN(data: { bvn: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/bvn/verification/`, data)
}

// // function forgotPassword(data): Promise<void> {
// //   return fetchWrapper.post(`${baseUrl}/auth/forgot-password/`, data);
// // }

// // function resetPassword(data): Promise<void> {
// //   return fetchWrapper.post(`${baseUrl}/auth/reset-password/`, data);
// // }

function verifyAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-token/`, data)
}

function refreshAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper
    .post(`${baseUrl}/auth/refresh-token/`, data)
    .then((user: any) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      console.log("user", user)
      userSubject.next(user)
      localStorage.setItem("pesaToken", JSON.stringify(user))
    })
}

function getCurrentUser(): Promise<UserInterface> {
  return fetchWrapper.get(`${baseUrl}/account_users/me/`)
}

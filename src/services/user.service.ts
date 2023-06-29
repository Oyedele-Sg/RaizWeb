import { BehaviorSubject } from "rxjs"
import { fetchWrapper } from "@/utils/fetchWrapper"
import { URL } from "@/utils/constants"
import { redirect } from "next/navigation"

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

  // logout,
  // getUser,
}

// auth
// function login(data): Promise<void> {
//   return fetchWrapper
//     .post(`${baseUrl}/auth/login/`, data)
//     .then((user: typeof fetchWrapper.userValue) => {
//       // publish user to subscribers and store in local storage to stay logged in between page refreshes
//       userSubject.next(user.data)
//       localStorage.setItem("trclient", JSON.stringify(user.data))
//     })
// }

// function logout(): void {
//   // remove user from local storage, publish null to user subscribers, and redirect to login page
//   localStorage.removeItem("trclient")
//   userSubject.next(null)
//   redirect("/login")
// }

// // function signup(data): Promise<void> {
// //   return fetchWrapper.post(`${baseUrl}/auth/signup/`, data);
// // }

// // function forgotPassword(data): Promise<void> {
// //   return fetchWrapper.post(`${baseUrl}/auth/forgot-password/`, data);
// // }

// // function resetPassword(data): Promise<void> {
// //   return fetchWrapper.post(`${baseUrl}/auth/reset-password/`, data);
// // }

// function getUser(id: string): Promise<void> {
//   return fetchWrapper.get(`${baseUrl}/account_users/${id}/`)
// }

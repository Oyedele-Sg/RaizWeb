import { verify } from "crypto"
import { userService } from "../services"
import { URL } from "./constants"
import { toast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast"

type RequestOptions = {
  method: string
  headers: HeadersInit
  body?: BodyInit | null
}

interface AuthHeader {
  Authorization?: string
}

export const fetchWrapper = {
  get,
  post,
  put,
  deleteRequest,
  deleteBody,
  patch,
}

function get<T>(url: string): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "GET",
    headers: authHeader(url),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function post<T>(url: string, body: any): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function put<T>(url: string, body: any): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function patch<T>(url: string, body: any): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function deleteRequest<T>(url: string): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function deleteBody<T>(url: string, body: any): Promise<T> {
  const requestOptions: RequestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader(url) },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then((response) =>
    handleResponse<T>(response)
  )
}

function authHeader(url: string): Record<string, string> {
  const user = userService.userValue
  const isLoggedIn = user && user.token
  const isApiUrl = url.startsWith(URL)

  if (isLoggedIn && isApiUrl) {
    // verifyToken()
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

function handleResponse<T>(response: Response): Promise<T> {
  // trying to verify tok
  // if (userService.userValue) {
  //
  // }

  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if ([401].includes(response.status) && userService.userValue) {
        console.log("401", response.status)
        // verifyToken()
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api

        // userService.logout()
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data as T // Assert the type of 'data' as 'T'
  })
}

async function verifyToken(): Promise<void> {
  // Implement the logic to verify the token using userService.verifyAuthToken
  // You can replace the console.log statements with your actual verification logic
  // console.log("Verifying token:", data.token)

  try {
    const response = await userService.verifyAuthToken({
      token: `Bearer ${userService.userValue.token}`,
    })
    //@ts-ignore

    if (response?.message === "Invalid token") {
      await userService.refreshAuthToken({
        token: userService.userValue.refresh_token,
      })
    }
  } catch (error) {
    toast({
      title: "Something Went Wrong",
      description: `${error}`,
      variant: "destructive",
      style: {
        backgroundColor: "#f44336",
        color: "#fff",
        top: "20px",
        right: "20px",
      },
    })
    userService.logout()
  }
}

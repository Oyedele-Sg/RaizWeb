import axios, { AxiosInstance, AxiosResponse } from "axios"
import { URL } from "./constants"
import { userService } from "@/services"

const axiosInstance: AxiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  const user = userService.userValue
  const isLoggedIn = user && user.token.access_token
  const isApiUrl = config.url?.startsWith(URL)

  if (isLoggedIn && isApiUrl) {
    config.headers["Authorization"] = `Bearer ${user.token.access_token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (
      error.response &&
      [401, 403].includes(error.response.status) &&
      userService.userValue
    ) {
      userService.logout()
    }

    return Promise.reject(error.response?.data?.message || error.message)
  }
)

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  deleteBody: _deleteBody,
  patch,
  postForm,
  patchForm,
  putForm,
}

function get<T>(url: string): Promise<T> {
  return axiosInstance
    .get<T>(url)
    .then((response: AxiosResponse<T>) => response.data)
}

function post<T>(url: string, body: any): Promise<T> {
  return axiosInstance
    .post<T>(url, body)
    .then((response: AxiosResponse<T>) => response.data)
}

function postForm<T>(url: string, body: any): Promise<T> {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key])
  })

  return axiosInstance
    .post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response: AxiosResponse<T>) => response.data)
}

function patchForm<T>(url: string, body: any): Promise<T> {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key])
  })

  return axiosInstance
    .patch<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response: AxiosResponse<T>) => response.data)
}

function putForm<T>(url: string, body: any): Promise<T> {
  const formData = new FormData()
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key])
  })

  return axiosInstance
    .put<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response: AxiosResponse<T>) => response.data)
}

function put<T>(url: string, body: any): Promise<T> {
  return axiosInstance
    .put<T>(url, body)
    .then((response: AxiosResponse<T>) => response.data)
}

function patch<T>(url: string, body: any): Promise<T> {
  return axiosInstance
    .patch<T>(url, body)
    .then((response: AxiosResponse<T>) => response.data)
}

function _delete<T>(url: string): Promise<T> {
  return axiosInstance
    .delete<T>(url)
    .then((response: AxiosResponse<T>) => response.data)
}

function _deleteBody<T>(url: string, body: any): Promise<T> {
  return axiosInstance
    .delete<T>(url, { data: body })
    .then((response: AxiosResponse<T>) => response.data)
}

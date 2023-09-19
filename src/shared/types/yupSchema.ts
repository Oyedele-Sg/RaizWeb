import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number  "
    )
    .required(),
})

export const registerSchema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Wrong Email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number "
    )
    .required(),
  user_type_id: yup.number().required(),
})

export const changePasswordSchema = yup.object().shape({
  old_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number "
    )
    .required(),
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number "
    )
    .required(),
})

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Wrong Email format").required("Email is required"),
})
export const resetPasswordSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number "
    )
    .required(),
})

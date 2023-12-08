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
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Password confirmation must match the password"
    )
    .required("Password confirmation is required"),
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
export const forgotPinSchema = yup.object().shape({
  otp: yup.string().required("OTP is required"),
  transaction_pin: yup
    .string()
    .min(4, "Pin must be at least 4 characters")
    .required("Pin is required"),
  confirm_transaction_pin: yup
    .string()
    .oneOf([yup.ref("transaction_pin")], "Pin confirmation must match the pin")
    .required("Pin confirmation is required"),
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

export const createTransactionPinSchema = yup.object().shape({
  transaction_pin: yup
    .string()
    .min(4, "Pin must be at least 4 characters")
    .required("Pin is required"),
})

export const transactionPinSchema = yup.object().shape({
  old_transaction_pin: yup
    .string()
    .min(4, "Pin must be at least 4 characters")
    .max(4, "Pin must be at least 4 characters")
    .required("OTP is required"),
  new_transaction_pin: yup
    .string()
    .min(4, "Pin must be at least 4 characters")
    .max(4, "Pin must be at least 4 characters")
    .required("OTP is required"),
})

export const splitGroupSchema = yup.object().shape({
  split_group_name: yup.string().required("Group Name is required"),
  total_amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number"),
})

export const createAjoSchema = yup.object().shape({
  ajo_name: yup.string().required(),
  public: yup.boolean().required(),
  image_url: yup.string().required(),
  target_amount: yup.number().nullable().required(),
  start_date: yup.date().nullable().required(),
  end_date: yup.date().nullable().required(),
  number_of_slots: yup.number().nullable().required(),
  amount_per_cycle: yup.number().nullable().required(),
  collection_frequency_id: yup.number().nullable().required(),
})

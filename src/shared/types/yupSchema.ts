import * as yup from "yup"

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email Address").required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number"
    )
    .required(),
})

export const registerSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email("Wrong Email format").required(),
  password: yup.string().required(),
  user_type_id: yup.number().required(),
  // confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
})

import { FieldValues } from "react-hook-form"

export interface WalletTier {
  wallet_tier_id: number
  wallet_tier_name: string
  wallet_tier_description: string
  active: number
  created_at: Date
  updated_at: Date
}

export interface WalletType {
  wallet_id: string
  account_user_id: string
  account_balance: number
  wallet_tier_id: number
  wallet_name: string
  account_number: string
  active: number
  created_at: Date
  updated_at: Date
  wallet_tier: WalletTier
}

export interface WithdrawalAccountType {
  withdrawal_account_id: string
  account_user_id: string
  withdrawal_account_name: string
  withdrawal_account_number: string
  bank_short_code: string
  withdrawal_bank_name: string
  primary: boolean
  active: number
  created_at: Date
  updated_at: Date
}

export interface UserTypeinterface {
  user_type_id: number
  user_type: string
  active: number
  created_at: Date
  updated_at: Date
}

export interface UserInterface {
  account_user_id: string
  user_type_id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  date_of_birth: Date
  username: string
  profile_image_url: string
  qr_code: string
  is_phone_verified: boolean
  is_email_verified: boolean
  is_bvn_verified: boolean
  active: number
  created_at: Date
  updated_at: Date
  user_type: UserTypeinterface
  wallets: WalletType[]
  withdrawal_accounts: WithdrawalAccountType[]
}

export interface RegisterDataInterface extends Partial<FieldValues> {
  user_type_id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface LoginDataInterface extends Partial<FieldValues> {
  email: string
  password: string
}

export interface OTPFormValues extends FieldValues {
  otp1: string
  otp2: string
  otp3: string
  otp4: string
  otp5: string
}

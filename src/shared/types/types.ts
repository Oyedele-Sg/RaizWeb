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

export interface BankInterface {
  bankCode: string
  bankName: string
}

export interface BankDataInterface {
  banks: BankInterface[]
}

export interface PaymentMethodInterface {
  payment_method: string
  description: string
  payment_method_id: number
  created_at: Date
  updated_at: Date
}

export interface TransactiontTypeInterface {
  transaction_type: string
  description: string
  transaction_type_id: number
  created_at: Date
  updated_at: Date
}

export interface TransactiontStatusInterface {
  status: string
  description: string
  transfer_status_id: number
  created_at: Date
  updated_at: Date
}

export interface TransactiontDataInterface {
  transaction_amount: string
  currency: string
  transaction_remarks: string
  transaction_reference: string
  transaction_date_time: string
  fee_amount: number
  vat_amount: number
  payment_method_id: number
  transaction_description: string
  transaction_id: string
  transaction_status_id: number
  third_party_name: string
  account_user_id: string
  transaction_type_id: number
  transaction_report_id: string
  created_at: Date
  updated_at: Date
  active: boolean
  transaction_status: TransactiontStatusInterface
  transaction_type: TransactiontTypeInterface
  payment_method: PaymentMethodInterface
}

export interface ExpenseChartDataInterface {
  category_name: string
  total_amount: number
  percentage: number
}

export interface ExpenseChartInterface {
  chart_data: ExpenseChartDataInterface[]
  start_date: Date
  end_date: Date
}

export interface IncomeSummarytDataInterface {
  total_income: number
  total_expense: number
  total_balance: number
  income_in_a_period: number
  expense_in_a_period: number
  balance_in_a_period: number
  start_date: Date
  end_date: Date
}

export interface UserSearchInterface {
  account_user_id: string
  first_name: string
  last_name: string
  username: string
}

export interface DebitTransferInterface {
  receiver_account_user_id: string
  transaction_amount: number
  transaction_remarks: string
  category_id: number
}

export interface TransactionPinInterface {
  transaction_pin: string
}

export interface InternalDebitDataInterface {
  debit_transfer: DebitTransferInterface
  transaction_pin: TransactionPinInterface
}

export interface CategoryDataInterface {
  category_id: 0
  category_name: string
  created_at: string
  updated_at: string
}

export interface ExternalDebitTransferInterface {
  beneficiary_account_name: string
  beneficiary_account_number: string
  transaction_amount: string
  narration: string
  beneficiary_bank_code: string
  beneficiary_bank_name: string
}

export interface ExternalDebitDataInterface {
  debit_transfer: ExternalDebitTransferInterface
  transaction_pin: TransactionPinInterface
}

export interface RequestDataInterface {
  requestee_account_id: string
  transaction_amount: number
  currency: "NGN"
  narration: string
  category_id: number
}

export interface NIPLookupDataInterface {
  account_name: string
  account_number: string
}

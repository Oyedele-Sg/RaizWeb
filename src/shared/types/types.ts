import { FieldValues } from "react-hook-form"
import { number } from "zod"

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
  has_transaction_pin: boolean
  is_phone_verified: boolean
  is_email_verified: boolean
  is_bvn_verified: boolean
  active: number
  created_at: Date
  updated_at: Date
  user_type: UserTypeinterface
  wallets: WalletType[]
  withdrawal_accounts: WithdrawalAccountType[]
  onboarding_checklist: {
    account_user_id: string
    checking: boolean | null
    savings: boolean | null
    ajo: boolean | null
    loan: boolean | null
  }
  is_debit_frozen: boolean
  referral_code: string
  referred_by_code: string
  reward_point: {
    account_user_id: string
    point: number
    reward_point_id: string
  }
}

export interface RegisterFormDataInterface {
  user_type_id: number
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  referred_by_code?: string
}
export interface RegisterDataInterface {
  user_type_id: number
  first_name: string
  last_name: string
  email: string
  password: string
  referred_by_code: string
}

export interface LoginDataInterface extends Partial<FieldValues> {
  email: string
  password: string
}
export interface ForgotPasswordDataInterface extends Partial<FieldValues> {
  email: string
}
export interface ForgotPinDataInterface extends Partial<FieldValues> {
  transaction_pin: string
  otp: string
  confirm_transaction_pin: string
}
export interface ResetPasswordDataInterface extends Partial<FieldValues> {
  password: string
  otp: string
}
export interface ForgotPasswordDataInterface extends Partial<FieldValues> {
  email: string
}
export interface ResetPasswordDataInterface extends Partial<FieldValues> {
  password: string
  otp: string
}

export interface ChangePasswordDataInterface extends Partial<FieldValues> {
  old_password: string
  new_password: string
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string
}
export interface UpdateTransactionPinFormInterface extends FieldValues {
  old_transaction_pin: string
  new_transaction_pin: string
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string
}

export interface VerifyEmailFormInterface extends FieldValues {
  otp: string
  old_password: string
  new_password: string
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string
}

export interface VerifyEmailFormInterface extends FieldValues {
  otp: string
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
  account_balance: number
  third_party_profile_image_url: string
  transaction_report_id: string
  created_at: Date
  updated_at: Date
  active: boolean
  transaction_status: TransactiontStatusInterface
  transaction_type: TransactiontTypeInterface
  payment_method: PaymentMethodInterface
}

export interface DailyAnalysistDataInterface {
  date: string
  credit: number
  debit: number
}

export interface DailyAnalysistChartInterface {
  account_analysis: DailyAnalysistDataInterface[]
  period: number
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
  profile_image_url: string
  account_id: string
}

export interface DebitTransferInterface {
  receiver_account_user_id: string
  transaction_amount: number | null
  transaction_remarks: string
  category_id: number | null
}

export interface TransactionPinInterface {
  transaction_pin: string
}

export interface InternalDebitDataInterface {
  debit_transfer: DebitTransferInterface
  transaction_pin: TransactionPinInterface
}

export interface CategoryDataInterface {
  category_id: number
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
  category_id: number | null
}

export interface NIPLookupDataInterface {
  account_name: string
  account_number: string
}

// export interface FavoriteAccountsByIDDataInterface {
//   account_user_id: string
//   favourite_account_user_id: string
//   favourite: boolean
//   ranking: number
//   favourite_wallet_id: string
//   created_at: Date
//   updated_at: Date
//   favourite_account_user: {
//     first_name: string
//     last_name: string
//     username: string
//     account_user_id: string
//     profile_image_url: string
//   }
// }

export interface FavoriteAccountsDataInterface {
  account_user_id: string
  favourite_account_user_id: string
  favourite: boolean
  ranking: number
  favourite_wallet_id: string
  created_at: Date
  updated_at: Date
  favourite_account_user: UserSearchInterface
}

export interface ExternalAccountDataInterface {
  bank_short_code: string
  bank_account_number: string
  bank_account_name: string
  bank_name: string
  external_account_id: string
  created_at: Date
  updated_at: Date
}
export interface ExternalFavoriteAccountsDataInterface {
  account_user_id: string
  external_account_id: string
  favourite: boolean
  ranking: number
  favourite_external_account_id: string
  created_at: Date
  updated_at: Date
  external_account: ExternalAccountDataInterface
}

export interface AccountInterface {
  first_name: string
  last_name: string
  username: string
  account_user_id: string
  profile_image_url: string
}
export interface PendingRequestDataInterface {
  requestee_account_id: string
  transaction_amount: number
  currency: "NGN"
  narration: string
  category_id: number
  requester_account_id: string
  status_id: number
  request_transfer_id: string
  requester_account: AccountInterface
  requestee_account: AccountInterface
  status: {
    status: string
    description: string
    request_fund_status_id: number
    created_at: Date
    updated_at: Date
  }
  created_at: Date
  updated_at: Date
  category: CategoryDataInterface
}

export interface NotificationCategoryInterface {
  notification_category_name: string
  notification_category_description: string
  notification_category_code: number
  notification_category_id: number
  created_at: Date
  updated_at: Date
}

export interface NotificationSubCategoryDataInterface {
  notification_sub_category_name: string
  notification_sub_category_description: string
  notification_sub_category_code: number
  notification_category_id: number
  notification_sub_category_id: number
  created_at: Date
  updated_at: Date
  notification_category: NotificationCategoryInterface
}

export interface NotificationDataInterface {
  notification_title: string
  notification_body: string
  read: boolean
  notification_category_id: number
  account_user_id: string
  object_id: string
  notification_sub_category: string
  notification_sub_category_id: number
  notification_url: string
  notification_id: string
  created_at: Date
  updated_at: Date
  notification_category: NotificationCategoryInterface
}

export interface SplitMemberDataInterface {
  split_members_id: string
  created_at: Date
  updated_at: Date
  split_group_id: string
  member_id: string
  amount: number
  status_id: number
  member: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
  }
  status: {
    status: string
    description: string
    status_code: number
    request_fund_status_id: number
    created_at: Date
    updated_at: Date
  }
}

export interface PendingSplitRequestDataInterface {
  split_group_id: string
  created_at: Date
  updated_at: Date
  split_members: SplitMemberDataInterface[]
  split_group_reason: string
  total_amount: number
  current_amount: number
  currency: string
  created_by_id: string
  created_by: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
  }
  category_id: number
  category: CategoryDataInterface
}

export interface SplitRequestDataInterface {
  split_group: {
    split_group_reason: string
    split_members: [
      {
        member_id: string
        amount: number
        status_id: 2
      }
    ]
    total_amount: number
    currency: "NGN"
    category_id: null
  }
  transaction_pin: {
    transaction_pin: string
  }
}

export interface NotificationDataInterface {
  notification_title: string
  notification_body: string
  read: boolean
  notification_category_id: number
  account_user_id: string
  object_id: string
  notification_url: string
  notification_id: string
  created_at: Date
  updated_at: Date
  notification_category: NotificationCategoryInterface
}

export interface CreditTransferDataInterface {
  transaction_amount: string
  currency: string
  transaction_remarks: string
  transaction_reference: string
  transaction_date_time: Date
  fee_amount: number
  vat_amount: number
  wallet_id: string
  account_number: string
  settled_amount: number
  source_bank_name: string
  source_account_name: string
  account_balance: number
  credit_transfer_id: string
  created_at: Date
}

export interface DebitTransferDataInterface {
  transaction_amount: string
  currency: string
  transaction_remarks: string
  transaction_reference: string
  transaction_date_time: Date
  fee_amount: number
  vat_amount: number
  wallet_id: string
  account_number: string
  beneficiary_account_name: string
  beneficiary_bank_name: string
  beneficiary_bank: string
  source_account_name: string
  account_balance: number
  debit_transfer_id: string
  created_at: Date
}

export interface DebitSplitRequestDataInterface {
  split_group_id: string
  created_at: Date
  updated_at: Date
  split_members: [
    {
      split_members_id: string
      created_at: Date
      updated_at: Date
      split_group_id: string
      member_id: string
      amount: number
      status_id: number
      member: {
        first_name: string
        last_name: string
        username: string
        account_user_id: string
      }
      status: {
        status: string
        description: string
        status_code: number
        request_fund_status_id: number
        created_at: Date
        updated_at: Date
      }
    }
  ]
  split_group_reason: string
  total_amount: number
  current_amount: number
  currency: string
  created_by_id: string
  created_by: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
  }
}

export interface FavoriteAccountsDataInterface {
  account_user_id: string
  favourite_account_user_id: string
  favourite: boolean
  ranking: number
  favourite_wallet_id: string
  created_at: Date
  updated_at: Date
  favourite_account_user: UserSearchInterface
}

export interface ExternalAccountDataInterface {
  bank_short_code: string
  bank_account_number: string
  bank_account_name: string
  bank_name: string
  external_account_id: string
  created_at: Date
  updated_at: Date
}
export interface ExternalFavoriteAccountsDataInterface {
  account_user_id: string
  external_account_id: string
  favourite: boolean
  ranking: number
  favourite_external_account_id: string
  created_at: Date
  updated_at: Date
  external_account: ExternalAccountDataInterface
}

export interface AccountInterface {
  first_name: string
  last_name: string
  username: string
  account_user_id: string
  profile_image_url: string
}
export interface PendingRequestDataInterface {
  requestee_account_id: string
  transaction_amount: number
  currency: "NGN"
  narration: string
  category_id: number
  requester_account_id: string
  status_id: number
  request_transfer_id: string
  requester_account: AccountInterface
  requestee_account: AccountInterface
  status: {
    status: string
    description: string
    request_fund_status_id: number
    created_at: Date
    updated_at: Date
  }
  created_at: Date
  updated_at: Date
  category: CategoryDataInterface
}

export interface NotificationCategoryInterface {
  notification_category_name: string
  notification_category_description: string
  notification_category_code: number
  notification_category_id: number
  created_at: Date
  updated_at: Date
}

export interface NotificationDataInterface {
  notification_title: string
  notification_body: string
  read: boolean
  notification_category_id: number
  account_user_id: string
  object_id: string
  notification_url: string
  notification_id: string
  created_at: Date
  updated_at: Date
  notification_category: NotificationCategoryInterface
}

export interface SplitMemberDataInterface {
  split_members_id: string
  created_at: Date
  updated_at: Date
  split_group_id: string
  member_id: string
  amount: number
  status_id: number
  member: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
  }
  status: {
    status: string
    description: string
    status_code: number
    request_fund_status_id: number
    created_at: Date
    updated_at: Date
  }
}

export interface PendingSplitRequestDataInterface {
  split_group_id: string
  created_at: Date
  updated_at: Date
  split_members: SplitMemberDataInterface[]
  split_group_reason: string
  total_amount: number
  current_amount: number
  currency: string
  created_by_id: string
  created_by: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
  }
  category_id: number
  category: CategoryDataInterface
}

export interface SplitRequestDataInterface {
  split_group: {
    split_group_reason: string
    split_members: [
      {
        member_id: string
        amount: number
        status_id: 2
      }
    ]
    total_amount: number
    currency: "NGN"
    category_id: null
  }
  transaction_pin: {
    transaction_pin: string
  }
}

export interface AjoCycleInterface {
  ajo_id: string
  target_amount: number
  start_date: Date
  end_date: Date
  number_of_slots: number
  number_of_cycles: number
  amount_per_cycle: number
  collection_frequency_id: number
  available_slots: number
  current_cycle: number
  current_slot: number
  ajo_cycle_id: string
  has_started: boolean
  has_ended: boolean
  created_at: Date
  updated_at: Date
  collection_frequency: {
    frequency_name: string
    frequency_description: string
    frequency_code: number
    no_of_days: number
    frequency_id: number
    created_at: Date
    updated_at: Date
  }
  next_payment_date: Date
}

export interface AjoDataInterface {
  ajo_id: string
  ajo_name: string
  public: boolean
  image_url: string
  created_by_id: string
  created_at: Date
  updated_at: Date
  ajo_description: string
  ajo_cycles: AjoCycleInterface[]
  created_by: {
    first_name: string
    last_name: string
    username: string
    account_user_id: string
    profile_image_url: string
  }
}

export interface AjoFormInterface {
  ajo_name: string
  public: boolean
  target_amount: number | null
  start_date: string | null
  end_date: string | null
  number_of_slots: number | null
  amount_per_cycle: number | null
  collection_frequency_id: number | null
}
export interface AjoCreateFormInterface {
  ajo_name: string
  public: boolean
  image_url: string
  target_amount: number | null
  start_date: string | null
  end_date: string | null
  number_of_slots: number | null
  amount_per_cycle: number | null
  collection_frequency_id: number | null
}

export interface AjoFrequencyInterface {
  frequency_name: string
  frequency_description: string
  frequency_code: number
  no_of_days: number
  frequency_id: number
  created_at: Date
  updated_at: Date
}

export interface AjoPaymentCycleMemberInterface {
  account_user_id: string
  slot_position: number
  payment_received: boolean
  number_of_payments_due: number
  account_user: {
    first_name: string
    last_name: string
  }
}

export interface AjoPaymentCycleInterface {
  ajo_id: string
  ajo_cycle_members: AjoPaymentCycleMemberInterface[]
  number_of_cycles: number
}

export interface CreateBudgetInterface {
  budget_name?: string
  total_budget: number
  budget_month: number
  budget_categories:
    | {
        category_id: number
        budget_amount: number
      }[]
    | undefined
}

export interface BudgetCategoryInterface {
  category_id: number
  budget_amount: number
  amount_spent: number
  budget_id: string
  budget_category_id: string
  category: CategoryDataInterface
}

export interface BudgetDataInterface {
  budget_name: string
  total_budget: number
  total_spent: number
  budget_month: number
  year: number
  account_user_id: string
  budget_id: string
  budget_categories: BudgetCategoryInterface[]
}

export interface BudgetCategoryTransactionInterface {
  transaction_amount: number
  currency: string
  transaction_remarks: string
  transaction_reference: string
  transaction_date_time: string
  fee_amount: number
  vat_amount: number
  beneficiary_account_name: string
  source_account_name: string
  beneficiary_account_number: string
  beneficiary_bank_name: string
  beneficiary_bank: string
  wallet_id: string
  category_id: number
  transaction_status_id: number
  payment_method_id: number
  account_balance: number
  debit_transfer_id: string
  created_at: Date
  updated_at: Date
  category: CategoryDataInterface
  transaction_status: TransactiontStatusInterface
  payment_method: PaymentMethodInterface
}

export interface NipBankDetailInterface {
  bankCode: string
  bankName: string
}
export interface NipBankInterface {
  banks: NipBankDetailInterface[]
}

export interface PayStackBankDetailInterface {
  id: number
  name: string
  slug: string
  code: string
  longcode: string
  pay_with_bank: boolean
  active: boolean
  country: string
  currency: string
  type: string
  is_deleted: boolean
}

export interface PayStackBankInterface {
  data: PayStackBankDetailInterface[]
  status: boolean
}

export interface ChargeBankInterface {
  code: string
  account_number: string
}

export interface InitiateChargeInterface {
  email: string
  amount: number
  bank: ChargeBankInterface
}

export interface PaystackAccountDetail {
  account_number: string
  account_name: string
}

export interface PaystackLookupDataInterface {
  status: boolean
  data: PaystackAccountDetail
}

export interface ChargeResponseInterface {
  reference: string
  status: string
  display_text: string
}
export interface InitiateChargeResponseInterface {
  status: boolean
  message: string
  data: ChargeResponseInterface
}

export interface InitiateBirthdayChargeInterface {
  birthday: string
  reference: string
}

export interface ChargeResponseDataInterface {
  reference: string
  status: string
  display_text: string
}
export interface BirthdayChargeResponseInterface {
  status: boolean
  message: string
  data: ChargeResponseDataInterface
}

export interface ChargeOTPInterface {
  otp: string
  reference: string
}

export interface ChargeOTPResponseInterface {
  status: boolean
  message: string
  data: ChargeResponseDataInterface
}

export interface ValidateChargeResponseInterface {
  transaction_amount: string
  currency: string
  transaction_remarks: string
  transaction_reference: string
  transaction_date_time: string
  fee_amount: number
  vat_amount: number
  wallet_id: string
  session_id: string
  account_number: string
  settled_amount: number
  initiation_transaction_reference: string
  settlement_id: string
  source_account_number: string
  source_bank_name: string
  channel_id: string
  payment_method_id: number
  source_account_name: string
  account_balance: number
  credit_transfer_id: string
  success: boolean
  message: string
}

export interface GroupSaveMemberDataInterface {
  target_save_group_id: string
  account_user_id: string
  frequency_id: number
  savings_wallet_id: string
  current_amount: number
  has_withdrawn: false
  next_payment_date: string
  preferred_credit_time: string
  preferred_deduction_amount: number
  preferred_deduction_day: number
  preferred_deduction_date: number
  primary_source_of_funds_id: string
  target_save_group_member_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  frequency: AjoFrequencyInterface
  target_save_group: TargetSavingsGroupDataInterface
  primary_source_of_funds: {
    wallet_id: string
    account_user_id: string
    account_balance: number
    wallet_tier_id: number
    wallet_type_id: number
    wallet_name: string
    account_number: string
    active: number
    created_at: Date
    updated_at: Date
    wallet_tier: WalletTier
    wallet_type: WalletType
  }
  individual_completion_percentage: number
}

export interface TargetSaveDataInferface {
  image_url: string | null
  target_amount: number
  target_save_name: string
  target_save_description: string
  start_date: Date
  end_date: Date
  target_save_category_id: number
  interest_rate_id: number
  penalty_fee_id: number
  target_save_id: string
  created_at: Date
  updated_at: Date
  target_save_category: TargetSavingsCategoryInterface
  interest_rate: InterestRateInterface
  penalty_fee: PenaltyFeeDataInterface
}
export interface TargetSavingsGroupDataInterface {
  target_save_id: string
  created_by_id: string
  public: boolean
  target_save_group_id: string
  created_at: string
  updated_at: string
  target_save: TargetSaveDataInferface
  created_by: CreatedByInterface
  target_save_group_members: TargetSavingsGroupMembersDataInterface[]
  completion_percentage: number
  target_save_group_member_id: string
}

export interface CreatedByInterface {
  first_name: string
  last_name: string
  username: string
  account_user_id: string
  profile_image_url: string | null
}

export interface TargetSavingsGroupMembersDataInterface {
  target_save_group_id: string
  account_user_id: string
  frequency_id: number
  savings_wallet_id: string
  current_amount: number
  has_withdrawn: boolean
  next_payment_date: string
  preferred_credit_time: string
  preferred_deduction_amount: number
  primary_source_of_funds: string
  target_save_group_member_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  frequency: {
    frequency_name: string
    frequency_description: string
    frequency_code: number
    no_of_days: number
    frequency_id: number
    created_at: Date
    updated_at: Date
  }
}

export interface TargetSavingsCategoryInterface {
  target_save_category_name: string
  target_save_category_description: string
  target_save_category_code: number
  target_save_category_id: number
  created_at: Date
  updated_at: Date
}

export interface InterestRateInterface {
  interest_rate: number
  interest_rate_description: string
  interest_rate_code: number
  interest_rate_id: number
  created_at: Date
  updated_at: Date
}

export interface CreateTargetSavingsFormInterface {
  image_url: string
  target_amount: number
  target_save_name: string
  target_save_description: string
  start_date?: Date
  end_date?: Date
  frequency_id: number | null
  preferred_credit_time: string | null
  preferred_deduction_amount: number | null
  primary_source_of_funds_id: string | null
  public: boolean
  preferred_deduction_day: number | null
  preferred_deduction_date: number | null
}

export interface CreateLockSavingsFormInterface {
  lock_save_description: string
  lock_save_amount: number
}

export interface SavingsWalletInterface {
  account_user_id: string
  savings_category_id: number
  account_balance: number
  savings_wallet_name: string
  savings_wallet_description: string
  savings_wallet_id: string
  created_at: Date
  updated_at: Date
  savings_category: {
    savings_category_name: string
    savings_category_description: string
    savings_category_code: number
    savings_category_id: number
    created_at: Date
    updated_at: Date
  }
}

export interface PersonalTargetSavingsDataInterface {
  completion_percentage: number
  target_save_id: string
  frequency_id: number
  account_user_id: string
  savings_wallet_id: string
  current_amount: number
  has_withdrawn: boolean
  preferred_credit_time: string
  next_payment_date: Date
  preferred_deduction_amount: number
  primary_source_of_funds: string
  personal_target_save_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  savings_wallet: SavingsWalletInterface
  target_save: {
    image_url: string
    target_amount: number
    target_save_name: string
    target_save_description: string
    start_date: Date
    end_date: Date
    target_save_category_id: number
    interest_rate_id: number
    penalty_fee_id: number
    target_save_id: string
    created_at: Date
    updated_at: Date
    target_save_category: {
      target_save_category_name: string
      target_save_category_description: string
      target_save_category_code: number
      target_save_category_id: number
      created_at: Date
      updated_at: Date
    }
    interest_rate: InterestRateInterface
    penalty_fee: PenaltyFeeDataInterface
    frequency: AjoFrequencyInterface
  }
}

export interface GroupTargetSavingsActivitiesCategoryInterface {
  target_save_activity_category_name: string
  target_save_activity_category_description: string
  target_save_activity_category_code: number
  target_save_activity_category_id: number
  created_at: Date
  updated_at: Date
}
export interface GroupTargetSavingsActivitiesDataInterface {
  target_save_group_id: string
  account_user_id: string
  target_save_group_activity_description: string
  target_save_activity_category_id: number
  amount: number
  target_save_group_activity_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  target_save_activity_category: GroupTargetSavingsActivitiesCategoryInterface
}

export interface PersonalTargetSavingsActivitiesDataInterface {
  personal_target_save_id: string
  account_user_id: string
  activity_description: string
  personal_target_save_activity_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
}

export interface LockSavingsDataInterface {
  days_left: number
  lock_save_description: string
  lock_save_amount: number
  end_date: Date
  savings_wallet_id: string
  account_user_id: string
  lock_save_duration: number
  lock_save_interest_rate_id: number
  lock_save_penalty_fee_id: number
  start_date: Date
  has_withdrawn: boolean
  lock_save_id: string
  created_at: Date
  updated_at: Date
  interest_amount: number
  savings_wallet: SavingsWalletInterface
  interest_rate: InterestRateInterface
  penalty_fee: PenaltyFeeDataInterface
  completion_percentage: number
}

export interface LockSaveInterestInterface {
  amount: number
  end_date: Date
  start_date: Date
  interest: number
  interest_rate: number
  duration: number
}

export interface LockSaveCreateDateInterface {
  lock_save_description: string
  lock_save_amount: number
  end_date: Date
}

export interface FreezeDebitDataInterface {
  is_debit_frozen: boolean
  transaction_pin: string
}

export interface JoinTargetSaveFromInterface {
  frequency_id: number | null
  preferred_credit_time: string | null
  preferred_deduction_amount: number | null
  primary_source_of_funds_id: string | null
  preferred_deduction_day: number | null
  preferred_deduction_date: number | null
}

export interface EarlyPenaltyFormInterface {
  amount: number
  end_date: Date
  withdraw_date: Date
}

export interface EarlyPenaltyDataInterface {
  amount: number
  end_date: Date
  withdraw_date: Date
  start_date: Date
  penalty_fee: number
  penalty_fee_rate: number
  duration: number
}

export interface PersonalTargetSavingsWithdrawalDataInterface {
  amount: number
  transaction_pin: string
}

export interface PersonalTargetTransferDataInterface {
  amount: number
  transaction_pin: string
  personal_target_save_id: string
}

export interface GroupTargetTransferDataInterface {
  amount: number
  transaction_pin: string
  target_save_group_member_id: string
}

export interface GroupTargetTransferWithdrawInterface {
  amount: number
  transaction_pin: string
}
export interface EditSavingDataInterface {
  frequency_id: number | null
  preferred_credit_time: string | null
  preferred_deduction_amount: number
  preferred_deduction_day: number | null
  preferred_deduction_date: number | null
}

export interface GroupTargetTransferDataInterface {
  amount: number
  transaction_pin: string
  target_save_group_member_id: string
}

export interface GroupTargetTransferWithdrawInterface {
  amount: number
  transaction_pin: string
}
export interface EditSavingDataInterface {
  frequency_id: number | null
  preferred_credit_time: string | null
  preferred_deduction_amount: number
  preferred_deduction_day: number | null
  preferred_deduction_date: number | null
}

export interface JoinTargetSaveFormData {
  account_user_id: string | null
  email: string | null
  phone_number: string | null
  description: string | null
  first_name: string | null
  last_name: string | null
}

export interface PenaltyFeeDataInterface {
  penalty_fee_rate: number
  penalty_fee_description: string
  penalty_fee_code: number
  penalty_fee_id: number
  created_at: Date
  updated_at: Date
}

export interface TargetSaveInviteDataInterface {
  target_save_group_id: string
  account_user_id: string
  email: string
  invited_by_id: string
  description: string
  has_accepted: boolean
  target_save_group_invite_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  invited_by: AccountInterface
  target_save_group: {
    target_save_id: string
    created_by_id: string
    target_save_group_category_id: number
    public: boolean
    target_save_group_id: string
    created_at: Date
    updated_at: Date
    target_save: TargetSaveDataInferface
    created_by: CreatedByInterface
    target_save_group_members: TargetSavingsGroupMembersDataInterface[]
    target_save_group_category: TargetSavingsCategoryInterface
    completion_percentage: number
  }
}

export interface TermLoanSupportingDocumentsInterface {
  identity_document_url: string
  utility_bill_url: string
  bank_statement_url: string
  loan_application_id: string
  loan_supporting_documents_id: string
  created_at: Date
  updated_at: Date
}

export interface TermLoanCategoryInterface {
  term_loan_category_name: string
  term_loan_category_description: string
  term_loan_category_code: number
  term_loan_category_id: number
  created_at: Date
  updated_at: Date
}

export interface RepaymentFrequencyInterface {
  frequency_name: string
  frequency_description: string
  frequency_code: number
  no_of_days: number
  frequency_id: number
  created_at: Date
  updated_at: Date
}

export interface ApprovalStatusInterface {
  loan_approval_status_name: string
  loan_approval_status_description: string
  loan_approval_status_code: number
  loan_approval_status_id: number
  created_at: Date
  updated_at: Date
}

export interface LoanCategoryInterface {
  loan_category_name: string
  loan_category_description: string
  loan_category_code: number
  supporting_documents: string
  fixed_loan_interest_rate_id: number
  defaulting_loan_interest_rate_id: number
  roll_over_interest_rate_id: number
  loan_category_id: number
  fixed_loan_interest_rate: {
    fixed_loan_interest_rate_name: string
    fixed_loan_interest_rate: number
    fixed_loan_interest_rate_description: string
    fixed_loan_interest_rate_code: number
    fixed_loan_interest_rate_id: number
    created_at: Date
    updated_at: Date
  }
  defaulting_loan_interest_rate: {
    defaulting_loan_interest_rate_name: string
    defaulting_loan_interest_rate_description: string
    defaulting_loan_interest_rate_code: number
    defaulting_loan_interest_rate: number
    defaulting_loan_interest_rate_id: number
    created_at: Date
    updated_at: Date
  }
  roll_over_interest_rate: {
    roll_over_interest_rate_name: string
    roll_over_interest_rate_description: string
    roll_over_interest_rate_code: number
    roll_over_interest_rate: number
    roll_over_interest_rate_id: number
    created_at: Date
    updated_at: Date
  }
  created_at: Date
  updated_at: Date
}

export interface LoanApplicationDataInterface {
  repayment_frequency_id: number
  loan_category_id: number
  loan_amount: number
  deduction_amount: number
  final_repayment_date: string
  loan_reason: string
  account_user_id: string
  approval_status_id: number
  complete_supporting_documents: true
  disapproval_reason: string
  term_loan_category_id: number
  loan_application_id: string
  interest_rate: number
  interest_amount: number
  total_amount: number
  approved_amount: number
  created_at: string
  updated_at: string
  repayment_frequency: RepaymentFrequencyInterface
  approval_status: ApprovalStatusInterface
  loan_category: LoanCategoryInterface
  account_user: AccountInterface
  term_loan_supporting_documents: TermLoanSupportingDocumentsInterface
  term_loan_category: TermLoanCategoryInterface
}

export interface LoanDataInterface {
  account_user_id: string
  loan_category_id: number
  repayment_frequency_id: number
  loan_reason: string
  loan_amount: number
  deduction_amount: number
  final_repayment_date: string
  next_payment_date: string
  number_of_total_payments: number
  number_of_payments_left: number
  loan_amount_unpaid: number
  loan_amount_paid: number
  is_loan_repaid: false
  interest_amount: number
  total_amount: 1
  term_loan_category_id: number
  loan_payment_status_id: number
  is_rolled_over: false
  rollover_repayment_date: string
  loan_id: string
  created_at: Date
  updated_at: Date
  account_user: AccountInterface
  loan_category: LoanCategoryInterface
  repayment_frequency: RepaymentFrequencyInterface
  term_loan_category: TermLoanCategoryInterface
  loan_payment_status: LoanPaymentStatus
  days_left: number
  percentage_completed: number
}

export interface LoanPaymentStatus {
  loan_payment_status_name: string
  loan_payment_status_description: string
  loan_payment_status_code: number
  loan_payment_status_id: number
  created_at: Date
  updated_at: Date
}

export interface CreateFlexLoanDataInterface {
  amount: number | null
  payback_date: string
  loan_reason: string
}

export interface LoanActivityDataInterface {
  loan_id: string
  activity_type: string
  activity_description: string
  loan_activity_id: string
  created_at: Date
  updated_at: Date
}

export interface LoanSummaryDataInterface {
  total_loans: number
  total_loans_repaid: number
  total_loans_unpaid: number
}

export interface RolloverCalculatorInterface {
  interest_amount: number
  current_interest: number
  amount: number
  duration: number
}

export interface SupportingDocuments {
  identity_document_url: string
  utility_bill_url: string
  bank_statement_url: string
}

export interface CreateTermLoanDataInterface {
  term_loan_category_id: number | null
  term_loan_supporting_documents: {
    identity_document_url: string
    utility_bill_url: string
    bank_statement_url: string
  }
  loan_amount: number | null
  loan_reason: string
  [key: string]: any
}

export interface TermLoanCategoryInterface {
  term_loan_category_name: string
  term_loan_category_description: string
  term_loan_category_code: number
  term_loan_category_id: number
  created_at: Date
  updated_at: Date
}

export interface UseCasesInterface {
  use_case_name: string
  use_case_description: string
  use_case_code: number
  use_case_emoji: string
  use_case_id: number
}

export interface AccountUseCaseDataInterface {
  use_case_ids: number[]
}

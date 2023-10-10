import { FieldValues } from 'react-hook-form';
import { number } from 'zod';

export interface WalletTier {
  wallet_tier_id: number;
  wallet_tier_name: string;
  wallet_tier_description: string;
  active: number;
  created_at: Date;
  updated_at: Date;
}

export interface WalletType {
  wallet_id: string;
  account_user_id: string;
  account_balance: number;
  wallet_tier_id: number;
  wallet_name: string;
  account_number: string;
  active: number;
  created_at: Date;
  updated_at: Date;
  wallet_tier: WalletTier;
}

export interface WithdrawalAccountType {
  withdrawal_account_id: string;
  account_user_id: string;
  withdrawal_account_name: string;
  withdrawal_account_number: string;
  bank_short_code: string;
  withdrawal_bank_name: string;
  primary: boolean;
  active: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserTypeinterface {
  user_type_id: number;
  user_type: string;
  active: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserInterface {
  account_user_id: string;
  user_type_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: Date;
  username: string;
  profile_image_url: string;
  qr_code: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  is_bvn_verified: boolean;
  active: number;
  created_at: Date;
  updated_at: Date;
  user_type: UserTypeinterface;
  wallets: WalletType[];
  withdrawal_accounts: WithdrawalAccountType[];
}

export interface RegisterDataInterface extends Partial<FieldValues> {
  user_type_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginDataInterface extends Partial<FieldValues> {
  email: string;
  password: string;
}
export interface ForgotPasswordDataInterface extends Partial<FieldValues> {
  email: string;
}
export interface ResetPasswordDataInterface extends Partial<FieldValues> {
  password: string;
  otp: string;
}

export interface ChangePasswordDataInterface extends Partial<FieldValues> {
  old_password: string;
  new_password: string;
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string;
}

export interface TransactionPinFormInterface extends FieldValues {
  transaction_pin: string;
}

export interface VerifyEmailFormInterface extends FieldValues {
  otp: string;
}

export interface BankInterface {
  bankCode: string;
  bankName: string;
}

export interface BankDataInterface {
  banks: BankInterface[];
}

export interface PaymentMethodInterface {
  payment_method: string;
  description: string;
  payment_method_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TransactiontTypeInterface {
  transaction_type: string;
  description: string;
  transaction_type_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TransactiontStatusInterface {
  status: string;
  description: string;
  transfer_status_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface TransactiontDataInterface {
  transaction_amount: string;
  currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: string;
  fee_amount: number;
  vat_amount: number;
  payment_method_id: number;
  transaction_description: string;
  transaction_id: string;
  transaction_status_id: number;
  third_party_name: string;
  account_user_id: string;
  transaction_type_id: number;
  transaction_report_id: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;
  transaction_status: TransactiontStatusInterface;
  transaction_type: TransactiontTypeInterface;
  payment_method: PaymentMethodInterface;
}

export interface DailyAnalysistDataInterface {
  date: string;
  credit: number;
  debit: number;
}

export interface DailyAnalysistChartInterface {
  account_analysis: DailyAnalysistDataInterface[];
  period: number;
}

export interface ExpenseChartDataInterface {
  category_name: string;
  total_amount: number;
  percentage: number;
}

export interface ExpenseChartInterface {
  chart_data: ExpenseChartDataInterface[];
  start_date: Date;
  end_date: Date;
}

export interface IncomeSummarytDataInterface {
  total_income: number;
  total_expense: number;
  total_balance: number;
  income_in_a_period: number;
  expense_in_a_period: number;
  balance_in_a_period: number;
  start_date: Date;
  end_date: Date;
}

export interface UserSearchInterface {
  account_user_id: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface DebitTransferInterface {
  receiver_account_user_id: string;
  transaction_amount: number | null;
  transaction_remarks: string;
  category_id: number | null;
}

export interface TransactionPinInterface {
  transaction_pin: string;
}

export interface InternalDebitDataInterface {
  debit_transfer: DebitTransferInterface;
  transaction_pin: TransactionPinInterface;
}

export interface CategoryDataInterface {
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface ExternalDebitTransferInterface {
  beneficiary_account_name: string;
  beneficiary_account_number: string;
  transaction_amount: string;
  narration: string;
  beneficiary_bank_code: string;
  beneficiary_bank_name: string;
}

export interface ExternalDebitDataInterface {
  debit_transfer: ExternalDebitTransferInterface;
  transaction_pin: TransactionPinInterface;
}

export interface RequestDataInterface {
  requestee_account_id: string;
  transaction_amount: number;
  currency: 'NGN';
  narration: string;
  category_id: number;
}

export interface NIPLookupDataInterface {
  account_name: string;
  account_number: string;
}

export interface FavoriteAccountsDataInterface {
  account_user_id: string;
  favourite_account_user_id: string;
  favourite: boolean;
  ranking: number;
  favourite_wallet_id: string;
  created_at: Date;
  updated_at: Date;
  favourite_account_user: UserSearchInterface;
}

export interface ExternalAccountDataInterface {
  bank_short_code: string;
  bank_account_number: string;
  bank_account_name: string;
  bank_name: string;
  external_account_id: string;
  created_at: Date;
  updated_at: Date;
}
export interface ExternalFavoriteAccountsDataInterface {
  account_user_id: string;
  external_account_id: string;
  favourite: boolean;
  ranking: number;
  favourite_external_account_id: string;
  created_at: Date;
  updated_at: Date;
  external_account: ExternalAccountDataInterface;
}

export interface AccountInterface {
  first_name: string;
  last_name: string;
  username: string;
  account_user_id: string;
}
export interface PendingRequestDataInterface {
  requestee_account_id: string;
  transaction_amount: number;
  currency: 'NGN';
  narration: string;
  category_id: number;
  requester_account_id: string;
  status_id: number;
  request_transfer_id: string;
  requester_account: AccountInterface;
  requestee_account: AccountInterface;
  status: {
    status: string;
    description: string;
    request_fund_status_id: number;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
  category: CategoryDataInterface;
}

export interface NotificationCategoryInterface {
  notification_category_name: string;
  notification_category_description: string;
  notification_category_code: number;
  notification_category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface NotificationDataInterface {
  notification_title: string;
  notification_body: string;
  read: boolean;
  notification_category_id: number;
  account_user_id: string;
  object_id: string;
  notification_url: string;
  notification_id: string;
  created_at: Date;
  updated_at: Date;
  notification_category: NotificationCategoryInterface;
}

export interface SplitMemberDataInterface {
  split_members_id: string;
  created_at: Date;
  updated_at: Date;
  split_group_id: string;
  member_id: string;
  amount: number;
  status_id: number;
  member: {
    first_name: string;
    last_name: string;
    username: string;
    account_user_id: string;
  };
  status: {
    status: string;
    description: string;
    status_code: number;
    request_fund_status_id: number;
    created_at: Date;
    updated_at: Date;
  };
}

export interface PendingSplitRequestDataInterface {
  split_group_id: string;
  created_at: Date;
  updated_at: Date;
  split_members: SplitMemberDataInterface[];
  split_group_reason: string;
  total_amount: number;
  current_amount: number;
  currency: string;
  created_by_id: string;
  created_by: {
    first_name: string;
    last_name: string;
    username: string;
    account_user_id: string;
  };
  category_id: number;
  category: CategoryDataInterface;
}

export interface SplitRequestDataInterface {
  split_group: {
    split_group_reason: string;
    split_members: [
      {
        member_id: string;
        amount: number;
        status_id: 2;
      }
    ];
    total_amount: number;
    currency: 'NGN';
    category_id: null;
  };
  transaction_pin: {
    transaction_pin: string;
  };
}

export interface NotificationDataInterface {
  notification_title: string;
  notification_body: string;
  read: boolean;
  notification_category_id: number;
  account_user_id: string;
  object_id: string;
  notification_url: string;
  notification_id: string;
  created_at: Date;
  updated_at: Date;
  notification_category: NotificationCategoryInterface;
}

export interface CreditTransferDataInterface {
  transaction_amount: string;
  currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: Date;
  fee_amount: number;
  vat_amount: number;
  wallet_id: string;
  account_number: string;
  settled_amount: number;
  source_bank_name: string;
  source_account_name: string;
  account_balance: number;
  credit_transfer_id: string;
  created_at: Date;
}

export interface DebitTransferDataInterface {
  transaction_amount: string;
  currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: Date;
  fee_amount: number;
  vat_amount: number;
  wallet_id: string;
  account_number: string;
  beneficiary_account_name: string;
  beneficiary_bank_name: string;
  beneficiary_bank: string;
  source_account_name: string;
  account_balance: number;
  debit_transfer_id: string;
  created_at: Date;
}

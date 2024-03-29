import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { URL } from '@/utils/constants';
import { useRouter, redirect } from 'next/navigation';
import {
  BankDataInterface,
  BankInterface,
  ExpenseChartInterface,
  IncomeSummarytDataInterface,
  LoginDataInterface,
  RegisterDataInterface,
  TransactiontDataInterface,
  UserInterface,
  UserSearchInterface,
  TransactionPinInterface,
  InternalDebitDataInterface,
  CategoryDataInterface,
  ExternalDebitDataInterface,
  RequestDataInterface,
  NIPLookupDataInterface,
  FavoriteAccountsDataInterface,
  ExternalFavoriteAccountsDataInterface,
  PendingRequestDataInterface,
  ForgotPasswordDataInterface,
  ResetPasswordDataInterface,
  DailyAnalysistChartInterface,
  ChangePasswordDataInterface,
  NotificationDataInterface,
  PendingSplitRequestDataInterface,
  SplitRequestDataInterface,
  AjoDataInterface,
  AjoFormInterface,
  AjoFrequencyInterface,
  CreditTransferDataInterface,
  DebitTransferDataInterface,
  DebitSplitRequestDataInterface,
  AjoCreateFormInterface,
  UpdateTransactionPinFormInterface,
  AjoPaymentCycleInterface,
  ForgotPinDataInterface,
  BudgetDataInterface,
  BudgetCategoryTransactionInterface,
  CreateBudgetInterface,
  NipBankInterface,
  PayStackBankInterface,
  InitiateChargeInterface,
  PaystackLookupDataInterface,
  InitiateChargeResponseInterface,
  InitiateBirthdayChargeInterface,
  BirthdayChargeResponseInterface,
  ChargeOTPInterface,
  ChargeOTPResponseInterface,
  ValidateChargeResponseInterface,
} from '@/shared';
import { BankInputProps } from '@/components/profile-setup/AddBankForm';
import { createSearchParams } from '@/utils/helpers';

const baseUrl = `${URL}`;
const storedUser =
  typeof window !== 'undefined' ? sessionStorage.getItem('pesaToken') : null;

const userSubject = new BehaviorSubject<any>(
  storedUser ? JSON.parse(storedUser) : null
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  logout,
  // getUser,
  login,
  signup,
  verifyEmail,
  resendEmail,
  verifyBVN,
  verifyAuthToken,
  refreshAuthToken,
  getCurrentUser,
  verifyPhone,
  addPhoneToUser,
  refreshPhoneOTP,
  verifyVoiceOTP,
  refreshVoiceOTP,
  updateUserProfileImage,
  updateUsername,
  getBanks,
  addBank,
  CreateWallet,
  getRecentTransactions,
  getExpenseChart,
  getIncomeSummary,
  searchWallets,
  addTransactionPin,
  walletTransfer,
  getCategory,
  externalTransfer,
  requestFunds,
  loadFunds,
  nipAccountLookup,
  getFavoriteAccounts,
  getExternalFavoriteAccounts,
  getPendingRequests,
  approveRequest,
  disapproveRequest,
  forgotPassword,
  resetPassword,
  getDailyAnalysisReport,
  generateQRCode,
  suggestUsername,
  changePassword,
  getNotifications,
  changeTransactionPin,
  getPendingSplitRequests,
  requestSplitFunds,
  getAjoAll,
  joinAjo,
  createAjo,
  getAjoFrequencies,
  getMyAjo,
  getAjoByID,
  getAjoMembers,
  leaveAjo,
  getCreditTransferDetail,
  getDebitTransferDetail,
  readNotification,
  getDebitSplitRequestDetail,
  getAjoPaymentTable,
  addFavoriteWalletAccount,
  getFavoriteAccountByID,
  getForgotPinOTP,
  resetTransactionPin,
  updateUserOnboardingList,
  deleteConnectedAccount,
  addPryAccount,
  getBudget,
  getBudgetByID,
  getBudgetCategoryTransaction,
  createBudget,
  downloadStatement,
  getNipBanks,
  getPaystackBanks,
  initiateCreditWithdrawalCharge,
  payStackAccountLookup,
  initiateBirthdayCharge,
  submitChargeOTP,
  validateChargeOTP,
};
// auth
function login(data: LoginDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/login/`, data).then((user: any) => {
    // publish user to subscribers and store in local storage to stay logged in between page refreshes

    userSubject.next(user);
    sessionStorage.setItem('pesaToken', JSON.stringify(user));
  });
}

function logout(): void {
  // remove user from local storage, publish null to user subscribers, and redirect to login page
  sessionStorage.removeItem('pesaToken');
  userSubject.next(null);

  // redirect("/login")
}

function signup(data: RegisterDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/signup/`, data);
}

function changePassword(data: ChangePasswordDataInterface): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/change-password/`, data);
}

function verifyEmail(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=email`, data);
}

function verifyPhone(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=phone`, data);
}

function verifyVoiceOTP(data: { otp: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-otp/?medium=voice`, data);
}
function refreshVoiceOTP(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=voice`, data);
}

function refreshPhoneOTP(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=phone`, data);
}
function addPhoneToUser(data: {
  phone_number: string;
  medium: string;
}): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/phone_number/`, data);
}

function resendEmail(data: { email: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/refresh-otp/?medium=email`, data);
}

function verifyBVN(data: { bvn: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/bvn/verification/`, data);
}

function forgotPassword(data: ForgotPasswordDataInterface): Promise<void> {
  return fetchWrapper.post(
    `${baseUrl}/auth/forgot-password/?email=${data.email}`,
    {}
  );
}

function resetPassword(data: ResetPasswordDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/reset-password/`, data);
}

// function resetPassword(data): Promise<void> {
//   return fetchWrapper.post(`${baseUrl}/auth/reset-password/`, data);
// }

function verifyAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/auth/verify-token/`, data);
}

function refreshAuthToken(data: { token: string }): Promise<void> {
  return fetchWrapper
    .post(`${baseUrl}/auth/refresh-token/`, data)
    .then((user: any) => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      // ("user", user)
      userSubject.next(user);
      sessionStorage.setItem('pesaToken', JSON.stringify(user));
    });
}

// profile apis
function getCurrentUser(): Promise<UserInterface> {
  return fetchWrapper.get(`${baseUrl}/account_users/me/`);
}

function updateUserProfileImage(data: {
  profile_image_url: string;
}): Promise<UserInterface> {
  return fetchWrapper.patch(`${baseUrl}/account_users/profile-image/`, data);
}
function updateUserOnboardingList(data: {
  checking?: boolean;
  savings?: boolean;
  ajo?: boolean;
  loan?: boolean;
}): Promise<UserInterface> {
  return fetchWrapper.patch(
    `${baseUrl}/account_users/update-onboarding-checklist/`,
    data
  );
}
//profile user
function updateUsername(data: { username: string }): Promise<UserInterface> {
  return fetchWrapper.patch(`${baseUrl}/account_users/username/`, data);
}
function suggestUsername(data: string): Promise<string[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/usernames/suggestions/?username=${data}`
  );
}

// lookup
function getBanks(): Promise<BankDataInterface> {
  return fetchWrapper.get(`${baseUrl}/nip-lookup/banks/`);
}

function addBank(data: BankInputProps): Promise<void> {
  return fetchWrapper.post(
    `${baseUrl}/account_users/withdrawal_accounts/`,
    data
  );
}

function addTransactionPin(data: TransactionPinInterface): Promise<void> {
  return fetchWrapper.patch(`${baseUrl}/account_users/transaction-pin/`, data);
}

function changeTransactionPin(
  data: UpdateTransactionPinFormInterface
): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/account_users/transaction-pin/update/`,
    data
  );
}

// wallet

function CreateWallet(): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/account_users/wallets/`, {});
}

// charts and graphs
export interface getRecentTransParams {
  start_date?: Date;
  end_date?: Date;
  limit?: number;
  offset?: number;
}

function getRecentTransactions(
  start_date?: string,
  end_date?: string,
  limit?: number,
  offset?: number
): Promise<TransactiontDataInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/recent-transactions/?${createSearchParams({
      start_date,
      end_date,
      limit,
      offset,
    })}`
  );
}

function getExpenseChart(
  start_date?: string,
  end_date?: string
): Promise<ExpenseChartInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/spend-chart/?${createSearchParams({
      start_date,
      end_date,
    })}`
  );
}

function getIncomeSummary(
  start_date?: Date,
  end_date?: Date
): Promise<IncomeSummarytDataInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/income-summary/?${createSearchParams({
      start_date,
      end_date,
    })}`
  );
}

function getDailyAnalysisReport(
  number_of_days?: number
): Promise<DailyAnalysistChartInterface> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/daily-account-analysis/?${createSearchParams({
      number_of_days,
    })}`
  );
}

// wallet
function searchWallets(query?: string): Promise<UserSearchInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/search/wallets/?search=${query || ''}`
  );
}

function generateQRCode(): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/account_users/qr_code/`, {});
}

// transfer
function walletTransfer(data: InternalDebitDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/debit/send-internal/`, data);
}
function externalTransfer(data: ExternalDebitDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/external/send/`, data);
}

// category
function getCategory(): Promise<CategoryDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/categories/`);
}

function requestFunds(data: RequestDataInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/credit/request-funds/`, data);
}

function loadFunds(): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/transfers/credit/load-account/`, {});
}

function nipAccountLookup(
  account_number?: string,
  bank_code?: string
): Promise<NIPLookupDataInterface> {
  return fetchWrapper.get(
    `${baseUrl}/nip-lookup/bank-account-details/?${createSearchParams({
      account_number,
      bank_code,
    })}`
  );
}

function getNotificationsByID(
  page?: string,
  notification_category_id?: string,
  read?: string
): Promise<NotificationDataInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/notifications/${notification_category_id}/?limit=10&page=1`
  );
}

function readNotification(
  notification_id?: string,
  read = true
): Promise<void> {
  const queryParams = read ? '?read=true' : '';
  return fetchWrapper.patch(
    `${baseUrl}/account_users/notifications/${notification_id}/${queryParams}`,
    {}
  );
}

// credit transfer
function getCreditTransferDetail(params: {
  notification_url?: string;
  credit_transfer_id?: string;
}): Promise<CreditTransferDataInterface> {
  const { notification_url, credit_transfer_id } = params;
  if (credit_transfer_id) {
    return fetchWrapper.get(
      `${baseUrl}/transfers/credit/get/${credit_transfer_id}`
    );
  } else {
    return fetchWrapper.get(`${baseUrl}/${notification_url}`);
  }
}

// debit transfer
function getDebitTransferDetail(params: {
  notification_url?: string;
  debit_transfer_id?: string;
}): Promise<DebitTransferDataInterface> {
  const { notification_url, debit_transfer_id } = params;
  if (debit_transfer_id) {
    return fetchWrapper.get(
      `${baseUrl}/transfers/debit/get/${debit_transfer_id}`
    );
  } else {
    return fetchWrapper.get(`${baseUrl}/${notification_url}`);
  }
}

//split request
function getDebitSplitRequestDetail(params: {
  notification_url?: string;
  split_request_id?: string;
}): Promise<DebitSplitRequestDataInterface> {
  const { notification_url, split_request_id } = params;
  if (split_request_id) {
    return fetchWrapper.get(
      `${baseUrl}/transfers/debit/split-requests/${split_request_id}`
    );
  } else {
    return fetchWrapper.get(`${baseUrl}/${notification_url}`);
  }
}

// favourites
function getFavoriteAccounts(): Promise<FavoriteAccountsDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/favourite_accounts/`);
}
function getFavoriteAccountByID(
  id: string
): Promise<FavoriteAccountsDataInterface> {
  return fetchWrapper.get(`${baseUrl}/favourite_accounts/${id}/`);
}

function getExternalFavoriteAccounts(): Promise<
  ExternalFavoriteAccountsDataInterface[]
> {
  return fetchWrapper.get(
    `${baseUrl}/favourite_external_accounts/account-user/get/`
  );
}

function addFavoriteWalletAccount(
  favorite_account_id: string,
  data: {
    account_user_id: string;
    favourite_account_user_id: string;
    favourite: boolean;
    ranking: number;
  }
): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/favourite_accounts/${favorite_account_id}/`,
    data
  );
}

// requsts

function getPendingRequests(): Promise<PendingRequestDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/transfers/debit/get-pending-requests/`);
}

function getPendingSplitRequests(): Promise<
  PendingSplitRequestDataInterface[]
> {
  return fetchWrapper.get(`${baseUrl}transfers/debit/get-my-split-requests/`);
}

function approveRequest(
  request_id: string,
  data: { transaction_pin: string }
): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/transfers/debit/request-funds/${request_id}/accept/`,
    data
  );
}
function disapproveRequest(request_id: string): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/transfers/debit/request-funds/${request_id}/decline/`,
    {}
  );
}

// notifications
function getNotifications(
  page?: string,
  notification_category_id?: string,
  read?: string
): Promise<NotificationDataInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/notifications/?limit=10&page=1`
  );
}

function requestSplitFunds(data: SplitRequestDataInterface): Promise<void> {
  return fetchWrapper.post(
    `${baseUrl}/transfers/credit/request-split/
  `,
    data
  );
}

//ajo
function getAjoAll(filter?: string): Promise<AjoDataInterface[]> {
  return fetchWrapper.get(
    `${baseUrl}/ajo/feed/public/${filter ? `?filter=${filter}` : ''}`
  );
}

function joinAjo(id: string): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/ajo/${id}/join/
  `,
    {}
  );
}

function createAjo(data: AjoCreateFormInterface): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/ajo/create/`, data);
}

function getAjoFrequencies(): Promise<AjoFrequencyInterface[]> {
  return fetchWrapper.get(`${baseUrl}/frequencies/`);
}

function getMyAjo(): Promise<AjoDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/ajo/my-ajos/all/`);
}

function getAjoByID(id: string): Promise<AjoDataInterface> {
  return fetchWrapper.get(`${baseUrl}/ajo/${id}/`);
}
function getAjoMembers(id: string): Promise<any> {
  return fetchWrapper.get(`${baseUrl}/ajo/${id}/ajo-membership/`);
}

function leaveAjo(id: string): Promise<any> {
  return fetchWrapper.patch(`${baseUrl}/ajo/${id}/leave/`, {});
}

function getAjoPaymentTable(id: string): Promise<AjoPaymentCycleInterface> {
  return fetchWrapper.get(`${baseUrl}/ajo/ajo-cycle/${id}/ajo-payment-table/`);
}

// forgot pin
function getForgotPinOTP(): Promise<void> {
  return fetchWrapper.post(
    `${baseUrl}/account_users/transaction-pin/forgot/`,
    {}
  );
}
function resetTransactionPin(data: {
  otp: string;
  transaction_pin: string;
}): Promise<void> {
  return fetchWrapper.patch(
    `${baseUrl}/account_users/transaction-pin/reset/`,
    data
  );
}

//manage account
function deleteConnectedAccount(id: string): Promise<any> {
  return fetchWrapper.deleteBody(
    `${baseUrl}/account_users/withdrawal_accounts/${id}/`,
    {}
  );
}

function addPryAccount(id: string): Promise<any> {
  return fetchWrapper.patch(
    `${baseUrl}/account_users/withdrawal-accounts/${id}/primary/`,
    {}
  );
}

// budget
function getBudget(): Promise<BudgetDataInterface[]> {
  return fetchWrapper.get(`${baseUrl}/budgets/`);
}

function getBudgetByID(id: string): Promise<BudgetDataInterface> {
  return fetchWrapper.get(`${baseUrl}/budgets/${id}/`);
}
function getBudgetCategoryTransaction(
  id: string
): Promise<BudgetCategoryTransactionInterface[]> {
  return fetchWrapper.get(`${baseUrl}/budget_categories/${id}/transactions/`);
}

function createBudget(data: CreateBudgetInterface): Promise<any> {
  return fetchWrapper.post(`${baseUrl}/budgets/`, data);
}

function downloadStatement(start: string, end: string): Promise<void> {
  return fetchWrapper.get(
    `${baseUrl}/account_users/get-account-statement/?start_date=${start}&end_date=${end}`
  );
}

function getNipBanks(): Promise<NipBankInterface> {
  return fetchWrapper.get(`${baseUrl}/nip-lookup/banks/`);
}

function getPaystackBanks(): Promise<PayStackBankInterface> {
  return fetchWrapper.get(`${baseUrl}/credit/withdrawal-account/banks/all/`);
}

function initiateCreditWithdrawalCharge(
  data: InitiateChargeInterface
): Promise<InitiateChargeResponseInterface> {
  return fetchWrapper.post(
    `${baseUrl}/credit/withdrawal-account/initiate-charge/`,
    data
  );
}

function initiateBirthdayCharge(
  data: InitiateBirthdayChargeInterface
): Promise<BirthdayChargeResponseInterface> {
  return fetchWrapper.post(
    `${baseUrl}/credit/withdrawal-account/charge-with-birthday/`,
    data
  );
}

function payStackAccountLookup(
  account_number?: string,
  bank_code?: string
): Promise<PaystackLookupDataInterface> {
  return fetchWrapper.get(
    `${baseUrl}/credit/withdrawal-account/banks/account-details/?${createSearchParams(
      {
        account_number,
        bank_code,
      }
    )}`
  );
}

function submitChargeOTP(
  data: ChargeOTPInterface
): Promise<ChargeOTPResponseInterface> {
  return fetchWrapper.post(
    `${baseUrl}/credit/withdrawal-account/charge-with-otp/`,
    data
  );
}

function validateChargeOTP(
  data: ChargeOTPInterface
): Promise<ValidateChargeResponseInterface> {
  return fetchWrapper.post(
    `${baseUrl}/credit/withdrawal-account/charge-with-otp/validate/`,
    data
  );
}

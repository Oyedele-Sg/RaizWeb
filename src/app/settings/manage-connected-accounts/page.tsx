'use client';
import { BankInputProps } from '@/components/profile-setup/AddBankForm';
import { ContentWrap } from '@/components/settings';
import { toast } from '@/components/ui/use-toast';
import { CurrentUserContext } from '@/providers/CurrentUserProvider';
import { userService } from '@/services';
import {
  AuthButton,
  BtnMain,
  Loading,
  RegisterInput,
  UserInterface,
  NipBankDetailInterface,
} from '@/shared';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SearchSelect, SearchSelectItem } from '@tremor/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch } from '@/shared/redux/types';
import { setLoadingFalse, setLoadingTrue } from '@/shared/redux/features';
import { useRouter } from 'next/navigation';
import { removeDuplicates, toastMessage } from '@/utils/helpers';

function page() {
  const dispatch = useAppDispatch();
  const Router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserInterface | undefined>(
    undefined
  );
  const [banks, setBanks] = useState<NipBankDetailInterface[]>();
  const getData = async () => {
    const response = await userService.getCurrentUser();
    getNIPBanks();
    setCurrentUser(response);
  };
  const handleDeleteAccount = async (id: string) => {
    try {
      await userService.deleteConnectedAccount(id);
      getData();
    } catch (error) {
      toastMessage('Something Went Wrong', `${error}`);
    }
  };

  const getNIPBanks = async () => {
    try {
      const res = await userService.getNipBanks();
      setBanks(removeDuplicates(res.banks));
    } catch (error) {
      toastMessage('Error loading banks...', `${error}`);
      dispatch(setLoadingFalse());
    }
  };

  const handleMakePryAccount = async (id: string) => {
    try {
      await userService.addPryAccount(id);
      getData();
    } catch (error) {
      toastMessage('Something Went Wrong', `${error}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const [currentStep, setCurrentStep] = useState<string>('view');

  const methods = useForm<BankInputProps>({
    defaultValues: {
      account_number: '',
      bank_code: '',
      bank_name: '',
      account_name: '',
    },
  });

  useEffect(() => {
    if (
      methods.watch('bank_code') &&
      methods.watch('account_number').length === 10
    ) {
      doNIPAccountLookup(
        methods.watch('account_number'),
        methods.watch('bank_code')
      );
    }
  }, [methods.watch('account_number')]);

  const onSubmit = async (data: BankInputProps) => {
    if (data.bank_name === '' || data.bank_code === '') {
      toastMessage('Something Went Wrong', `Pick a bank`);
      return;
    }

    const newData = {
      bank_name: data.bank_name,
      account_number: data.account_number,
      bank_code: data.bank_code,
    };

    try {
      dispatch(setLoadingTrue());
      await userService.addBank(newData);
      toast({
        title: ' Account added successfully',

        style: {
          backgroundColor: '#4B0082',
          color: '#fff',
        },
      });
      dispatch(setLoadingFalse());
      getData();
      setCurrentStep('view');
    } catch (error) {
      dispatch(setLoadingFalse());
      toastMessage('Something Went Wrong', `${error}`);
    }
  };

  const doNIPAccountLookup = async (
    accountNumber: string,
    bankCode: string
  ) => {
    try {
      dispatch(setLoadingTrue());
      const res = await userService.nipAccountLookup(accountNumber, bankCode);
      methods.setValue('account_name', res.account_name);

      dispatch(setLoadingFalse());
    } catch (error) {
      toastMessage('Something Went Wrong', `${error}`);
      dispatch(setLoadingFalse());
    }
  };

  const handleNavigation = () => {
    if (currentStep === 'add') {
      setCurrentStep('view');
    } else {
      Router.push(`/settings`);
    }
  };

  return (
    <>
      <Loading />
      <ContentWrap
        title={
          currentStep === 'view'
            ? 'Manage  External Connected Account'
            : 'Add New Account'
        }
        handleNavaigation={handleNavigation}
      >
        {currentStep === 'view' && (
          <>
            <div className=" flex flex-col gap-4 ">
              {currentUser?.withdrawal_accounts.map((account, index) => {
                return (
                  <div
                    key={index}
                    className=" flex items-center justify-between  border-b-[1.5px] border-neutral-30 p-b-4 "
                  >
                    <div className=" flex flex-col gap-2 ">
                      <h2 className=" text-neutral-90 font-semi-mid ">
                        {account.withdrawal_account_number}
                      </h2>
                      <p className=" uppercase text-neutral-80  ">
                        {account.withdrawal_bank_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 ">
                      <Image
                        src={`/settings/manage/${
                          account.primary ? `pry-active` : `pry`
                        }.svg`}
                        width={24}
                        height={24}
                        alt=""
                        onClick={() =>
                          handleMakePryAccount(account.withdrawal_account_id)
                        }
                      />
                      <Image
                        src={`/settings/manage/trash.svg`}
                        width={24}
                        height={24}
                        alt=""
                        onClick={() =>
                          handleDeleteAccount(account.withdrawal_account_id)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <AuthButton
              btnStyle=" w-full  "
              btnText="Add New Account"
              onClick={() => setCurrentStep('add')}
            />
          </>
        )}
        {currentStep === 'add' && (
          <div>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className=" flex flex-col gap-8 items-center  "
              >
                {/* <SearchSelect
                  placeholder="Select Bank"
                  className=""
                  onValueChange={(value) => {
                    const selectedBank = banks?.find(
                      (bank) => bank.bankCode === value
                    );

                    // @ts-ignore
                    methods.setValue('bank_name', selectedBank.bankName);
                    // @ts-ignore
                    methods.setValue('bank_code', selectedBank.bankCode);
                  }}
                >
                  {banks?.map((bank, index) => (
                    <SearchSelectItem
                      value={bank.bankCode}
                      key={index}
                      className=" select-item-reset  "
                    >
                      <span className=" text-purple  ">{`${bank.bankName}`}</span>
                      {'         '}
                    </SearchSelectItem>
                  ))}
                </SearchSelect> */}
                <Select
                  onValueChange={(value) => {
                    const selectedBank = banks?.find(
                      (bank) => bank.bankCode === value
                    );
                    methods.setValue(
                      'bank_name',
                      selectedBank?.bankName as string
                    );
                    methods.setValue(
                      'bank_code',
                      selectedBank?.bankCode as string
                    );
                  }}
                >
                  <SelectTrigger className="w-full outline-none rounded-none border-b-purple border-[1px] border-t-0 border-x-0  input_field-input capitalize  z-50 ">
                    <SelectValue placeholder="Select A bank " className="   " />
                  </SelectTrigger>
                  <SelectContent className=" bg-neutral-20 text-neutral-90 h-[200px] overflow-auto z-50 ">
                    {banks?.map((bank, index) => (
                      <SelectItem
                        key={index}
                        value={bank.bankCode}
                        className=" hover:bg-neutral-50 z-50 "
                      >
                        {bank.bankName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <RegisterInput
                  name={`account_number`}
                  inputPlaceholder={` Enter account number  `}
                  rules={{
                    required: 'Input an account number',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Account number must be a 10-digit number',
                    },
                  }}
                  label="Account number"
                  length={10}
                />

                <RegisterInput
                  name={`account_name`}
                  inputPlaceholder={` Account Name  `}
                  label="Account name"
                  disabled
                />

                <BtnMain
                  btnText="Add Account"
                  btnStyle=" bg-purple text-grey font-body__medium text-[18px]  w-[200px] h-[50px]  rounded-[8px] "
                />
              </form>
            </FormProvider>
          </div>
        )}
      </ContentWrap>
    </>
  );
}

export default page;

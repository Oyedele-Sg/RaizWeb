import React, { useEffect, useState } from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldError,
  UseFormRegister,
} from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useAppDispatch } from '@/shared/redux/types';
import { toast } from '@/components/ui/use-toast';
import { setLoadingFalse, setLoadingTrue } from '@/shared/redux/features';
import { userService } from '@/services';
import {
  BtnMain,
  IconSavedList,
  RegisterInput,
  NipBankDetailInterface,
} from '@/shared';
import { SearchSelect, SearchSelectItem } from '@tremor/react';
import { removeDuplicates, toastMessage } from '@/utils/helpers';

export interface BankInputProps extends Partial<FieldValues> {
  bank_name: string;
  account_number: string;
  bank_code: string;
}

interface Prop {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  add?: boolean;
}

export const AddBankForm = ({ setSuccess, add }: Prop) => {
  const dispatch = useAppDispatch();
  const [banks, setBanks] = useState<NipBankDetailInterface[]>();

  const methods = useForm<BankInputProps>({
    defaultValues: {
      account_number: '',
      bank_code: '',
      bank_name: '',
      account_name: '',
    },
  });

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

  const getNIPBanks = async () => {
    try {
      const res = await userService.getNipBanks();
      setBanks(removeDuplicates(res.banks));
    } catch (error) {
      toastMessage('Error loading banks...', `${error}`);
      dispatch(setLoadingFalse());
    }
  };

  useEffect(() => {
    getNIPBanks();
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
        title: ' Account created successfully',
        description:
          "We've created your account for you. Lets verify your email ",
        style: {
          backgroundColor: '#4B0082',
          color: '#fff',
        },
      });
      dispatch(setLoadingFalse());
      setSuccess(true);
    } catch (error) {
      dispatch(setLoadingFalse());
      toastMessage('Something Went Wrong', `${error}`);
    }
  };

  return (
    <div className=" flex  flex-col gap-3">
      <div className=" flex justify-between items-center">
        <h2 className="pl-3 font-body__large  text-purple font-semi-mid text-[18px]   ">
          Add Traditional Bank Number
        </h2>
        {add && (
          <div className="flex items-center gap-1 ">
            <IconSavedList />
            <span className=" text-[16px] leading-[20px] text-purple   ">
              {' '}
              Saved List{' '}
            </span>
          </div>
        )}
      </div>
      <div className=" bg-neutral-20 py-16 px-8 rounded-xl">
        <div className="">
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
      </div>
    </div>
  );
};

export default AddBankForm;

{
  /* <Select
                onValueChange={(value) => {
                  const selectedBank = banks.find(
                    (bank) => bank.bankName === value
                  )
                  // @ts-ignore
                  methods.setValue("bank_name", selectedBank.bankName)
                  // @ts-ignore
                  methods.setValue("bank_code", selectedBank.bankCode)
                }}
              >
                <SelectTrigger className='w-full  border-purple border-[1px] '>
                  <SelectValue
                    placeholder='Select A bank '
                    className=' text-purple   '
                  />
                </SelectTrigger>
                <SelectContent className=' bg-neutral-20 text-neutral-90 h-[200px] overflow-auto '>
                  {banks.map((bank, index) => (
                    <SelectItem
                      key={parseInt(bank.bankCode)}
                      // @ts-ignore
                      value={bank.bankName}
                      className=' hover:bg-neutral-50'
                      onClick={(value) => {
                        methods.setValue("bank_name", bank.bankName)
                        methods.setValue("bank_code", bank.bankCode)
                      }}
                    >
                      {bank.bankName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */
}

{
  /* {(!methods.watch("bank_name") ||
                    !methods.watch("bank_code")) && (
                    <span className='error-message'>Pick a bank</span>
                  )} */
}

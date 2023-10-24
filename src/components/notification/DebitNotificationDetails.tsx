import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';

export function DebitNotificationDetails() {
  const debitTransferDetails = useAppSelector(
    (state) => state.selectedDebitTransfer
  );

  return (
    <div className="bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className="flex flex-col gap-12">
        <div>
          {' '}
          <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-32">
            Amount:{' '}
            {`${debitTransferDetails?.currency} ${debitTransferDetails?.transaction_amount}`}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-t-18 text-neutral-70">
                Recipient: {debitTransferDetails?.beneficiary_account_name}
              </p>
              <p className="text-t-18 text-neutral-70">
                Recipient: {debitTransferDetails?.beneficiary_bank_name}
              </p>
              <p className="text-t-18 text-neutral-70">
                Date:
                {moment(debitTransferDetails?.transaction_date_time).format(
                  'dddd, Do [of] MMMM YYYY'
                )}
              </p>
              <p className="text-t-18 text-neutral-70">
                Remarks:
                {debitTransferDetails?.transaction_remarks}
              </p>
              <p className="text-t-18 text-neutral-70">
                Balance:{' '}
                {`${
                  debitTransferDetails?.currency
                } ${debitTransferDetails?.account_balance.toFixed(2)}`}
              </p>
              <p className="text-t-18 text-neutral-70">
                Reference ID: {debitTransferDetails?.transaction_reference}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

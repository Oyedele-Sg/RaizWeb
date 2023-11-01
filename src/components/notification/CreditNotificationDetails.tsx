import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';

export function CreditNotificationDetails() {
  const creditTransferDetails = useAppSelector(
    (state) => state.selectedCreditTransfer
  );

  return (
    <div className="bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className="flex flex-col gap-12">
        <div>
          {' '}
          <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-32">
            Amount:{' '}
            {`${creditTransferDetails?.currency} ${creditTransferDetails?.transaction_amount}`}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <p className="text-t-18 text-neutral-70">
                Sender: {creditTransferDetails?.source_account_name}
              </p>
              <p className="text-t-18 text-neutral-70">
                Date:
                {moment(creditTransferDetails?.transaction_date_time).format(
                  'dddd, Do [of] MMMM YYYY'
                )}
              </p>
              <p className="text-t-18 text-neutral-70">
                Remarks:
                {creditTransferDetails?.transaction_remarks}
              </p>
              <p className="text-t-18 text-neutral-70">
                Balance:{' '}
                {`${
                  creditTransferDetails?.currency
                } ${creditTransferDetails?.account_balance?.toFixed(2)}`}
              </p>
              <p className="text-t-18 text-neutral-70">
                Reference ID: {creditTransferDetails?.transaction_reference}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

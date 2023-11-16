import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';
import './Notification.css';

export function DebitNotificationDetails() {
  const debitTransferDetails = useAppSelector(
    (state) => state.selectedDebitTransfer
  );

  return (
    <div className="bg-grey p-2 rounded-lg max-h-[600px] overflow-auto ">
      <div className="flex flex-col gap-12">
        <div>
          {' '}
          <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-32">
            {`You paid ${debitTransferDetails?.beneficiary_account_name}`}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-neutral-70">
                  {moment(debitTransferDetails?.transaction_date_time).format(
                    'dddd, Do [of] MMMM YYYY'
                  )}
                </p>
                <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-26">
                  {`${debitTransferDetails?.currency} ${debitTransferDetails?.transaction_amount}`}
                </h4>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Payment Status:</p>
                <div className="flex items-center space-x-2">
                  {' '}
                  <div className="rounded-full w-[11px] h-[11px] bg-yellow"></div>
                  <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                    {`Received`}
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Payment Details:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`You sent ${debitTransferDetails?.currency} ${debitTransferDetails?.transaction_amount} to ${debitTransferDetails?.beneficiary_account_name}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Bank:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {debitTransferDetails?.beneficiary_bank_name}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Memo:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${debitTransferDetails?.transaction_remarks}`}
                </h4>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Balance:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${
                    debitTransferDetails?.currency
                  } ${debitTransferDetails?.account_balance.toFixed(2)}`}
                </h4>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Confirmation Code:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${debitTransferDetails?.transaction_reference}`}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

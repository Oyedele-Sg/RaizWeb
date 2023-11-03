import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';

export function CreditNotificationDetails() {
  const creditTransferDetails = useAppSelector(
    (state) => state.selectedCreditTransfer
  );
  return (
    <div className="bg-grey  p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className="flex flex-col gap-12">
        <div>
          {' '}
          <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-32">
            {`${creditTransferDetails?.source_account_name} sent you money`}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-neutral-70">
                  {moment(creditTransferDetails?.transaction_date_time).format(
                    'dddd, Do [of] MMMM YYYY'
                  )}
                </p>
                <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-26">
                  {`${creditTransferDetails?.currency} ${creditTransferDetails?.transaction_amount}`}
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
                  {`You received money from ${creditTransferDetails?.source_account_name}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Memo:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${creditTransferDetails?.transaction_remarks}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Confirmation Code:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${creditTransferDetails?.transaction_reference}`}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

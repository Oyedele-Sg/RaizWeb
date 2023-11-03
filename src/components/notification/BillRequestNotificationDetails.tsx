import { useAppSelector } from '@/shared/redux/types';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthButton, BtnMain } from '@/shared';

export function BillRequestNotificationDetails() {
  const request = useAppSelector((state) => state.selectedRequest);
  const Router = useRouter();
  return (
    <div className="bg-grey p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className=" flex flex-col gap-9 ">
        <div className=" flex flex-col gap-10 ">
          <div className="flex flex-col  gap-5 justify-center items-center ">
            <div className="">
              <Avatar className=" cursor-pointer border-neutral-30 border-[2px] w-[120px] h-[120px] bg-neutral-20 ">
                <AvatarFallback className=" text-purple font-bold   ">
                  {request?.requester_account?.first_name.charAt(0)}
                  {request?.requester_account?.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className=" flex flex-col gap-2 justify-center ">
              <h3 className=" text-neutral-70 text-[18px] font-semi-mid text-center ">
                Hey {request?.requestee_account?.first_name}{' '}
                {request?.requestee_account?.last_name}
                {', '}
              </h3>
              <h2 className=" text-purple text-[20px] text-center ">
                <span className="font-semi-mid ">
                  {request?.requester_account?.first_name}{' '}
                  {request?.requester_account?.last_name}
                </span>{' '}
                sent you a bill request
              </h2>
            </div>
          </div>
          <div className=" flex justify-between items-center ">
            <span className=" font-title__medium text-neutral-80 ">
              Split Bill
            </span>
            <span className=" text-purple font-semibold  ">
              {request.currency} {request.transaction_amount?.toFixed(2)}{' '}
            </span>
          </div>
          <div className=" flex justify-between items-center ">
            <span className=" font-title__medium text-neutral-80 ">
              Description
            </span>
            <span className=" text-purple font-semibold  ">
              {request.narration}{' '}
            </span>
          </div>
        </div>

        <div className=" flex justify-between gap-12 ">
          <BtnMain
            btnText="View"
            btnStyle=" py-2 px-4 border-purple border text-purple rounded-lg font-label__large flex-1 "
            onClick={() => Router.push('/request/approve')}
          />
        </div>
      </div>
    </div>
  );
}

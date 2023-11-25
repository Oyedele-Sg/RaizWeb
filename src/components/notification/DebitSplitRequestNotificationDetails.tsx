import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthButton, BtnMain } from '@/shared';
import './Notification.css';

export function DebitSplitRequestNotificationDetails() {
  const request = useAppSelector((state) => state.selectedDebitSplitRequest);
  return (
    <div className="bg-grey p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className=" flex flex-col gap-9 ">
        <div className=" flex flex-col gap-10 ">
          <div className="flex flex-col  gap-5 justify-center items-center ">
            <div className="">
              <Avatar className=" cursor-default border-neutral-30 border-[2px] w-[120px] h-[120px] bg-neutral-20 ">
                {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                <AvatarFallback className=" text-purple font-bold   ">
                  {request?.created_by?.first_name.charAt(0)}
                  {request?.created_by?.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className=" flex flex-col gap-2 justify-center ">
              <h3 className=" text-neutral-70 text-[18px] font-semi-mid text-center ">
                Hey {request?.split_members[0]?.member?.first_name}{' '}
                {request?.split_members[0]?.member?.last_name}
                {', '}
              </h3>
              <h2 className=" text-purple text-[20px] text-center ">
                <span className="font-semi-mid ">
                  {request?.created_by?.first_name}{' '}
                  {request?.created_by?.last_name}
                </span>{' '}
                sent you a bill request
              </h2>
            </div>
          </div>
          <div className=" flex justify-between items-center   ">
            <span className=" font-title__medium text-neutral-80 ">
              Split Bill
            </span>
            <span className=" text-purple font-semibold bug  ">
              {request.currency} {request.split_members[0].amount.toFixed(2)}{' '}
            </span>
          </div>
          <div className=" flex justify-between items-center ">
            <span className=" font-title__medium text-neutral-80 ">
              Description
            </span>
            <span className=" text-purple font-semibold  ">
              {request.split_group_reason}{' '}
            </span>
          </div>
        </div>

        <div className=" flex justify-between gap-12 ">
          <BtnMain
            btnText="Decline"
            btnStyle=" py-2 px-4 border-purple border text-purple rounded-lg font-label__large flex-1 "
            onClick={() => alert('Decline request.')}
          />
          <AuthButton
            btnText="Pay"
            btnStyle=" w-full flex-1   "
            onClick={() => alert('accept request')}
          />
        </div>
      </div>
    </div>
  );
}

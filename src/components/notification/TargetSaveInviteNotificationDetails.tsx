import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React from 'react';
import { AuthButton, BtnMain } from '@/shared';
import './Notification.css';
import { extractYearMonthDay } from '@/utils/helpers';

export function TargetSaveInviteNotificationDetails() {
  const targetSaveInviteDetail = useAppSelector(
    (state) => state.selectedTargetSaveInvite
  );

  return (
    <div className="bg-grey p-2 rounded-lg max-h-[500px] overflow-auto ">
      <div className="flex flex-col gap-12">
        <div>
          {' '}
          <h4 className="text-purple font-semi-mid text-t-20 lg:text-t-32">
            {`Saving Challenge Invitation`}
          </h4>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-t-15 text-neutral-70">Invitation By:</p>
                <div className="flex items-center space-x-2">
                  <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                    {`${targetSaveInviteDetail?.invited_by?.first_name}' '${targetSaveInviteDetail?.invited_by?.last_name} `}
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Saving Group Name:</p>
                <div className="flex items-center space-x-2">
                  <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                    {`${targetSaveInviteDetail?.target_save_group?.target_save?.target_save_name}`}
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-t-15 text-neutral-70">Description:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${targetSaveInviteDetail?.target_save_group?.target_save?.target_save_description}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Amount:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${targetSaveInviteDetail?.target_save_group?.target_save?.target_amount}/Member`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Interest Rate:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${targetSaveInviteDetail?.target_save_group?.target_save?.interest_rate?.interest_rate}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">Start Date:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${extractYearMonthDay(
                    targetSaveInviteDetail?.target_save_group?.target_save
                      ?.start_date
                  )}`}
                </h4>
              </div>

              <div>
                <p className="text-t-15 text-neutral-70">End Date:</p>
                <h4 className="text-purple font-semi-mid text-t-18 lg:text-t-26">
                  {`${extractYearMonthDay(
                    targetSaveInviteDetail?.target_save_group?.target_save
                      ?.end_date
                  )}`}
                </h4>
              </div>
            </div>
            <div className=" flex justify-between gap-12 ">
              <BtnMain
                btnText="Reject"
                btnStyle=" py-2 px-4 border-purple border text-purple rounded-lg font-label__large flex-1 "
                onClick={() => {}}
              />
              <AuthButton
                btnText="Approve"
                btnStyle=" py-2 px-4 border-purple border text-purple rounded-lg font-label__large flex-1 "
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

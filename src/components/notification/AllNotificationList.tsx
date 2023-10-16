import { useEffect, useState } from 'react';
import { usePendingRequest } from '@/hooks/request/usePendingRequest';
import { useNotification } from '@/hooks/notification/useNotification';
import {
  getSelectedNotification,
  getSelectedCreditTransfer,
  getSelectedDebitTransfer,
  getSelectedDebitSplitRequest,
  getSelectedRequest,
} from '@/shared/redux/features';
import { useAppDispatch, useAppSelector } from '@/shared/redux/types';
import { NotificationDetails } from '@/components/notification';
import moment from 'moment';
import { userService } from '@/services';
import React from 'react';
import { number } from 'zod';
import {
  NotificationDataInterface,
  PendingRequestDataInterface,
} from '@/shared';

interface NotificationItemProps {
  notification_id?: string;
}

export function AllNotificationList({
  notification_id,
}: NotificationItemProps) {
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [notificationType, setNotificationType] = useState('other');
  const requests = usePendingRequest();

  const notificationDetails = useAppSelector(
    (state) => state.selectedNotification
  );

  const toggleExpand = (index) => {
    expandedIndex === index ? setExpandedIndex(null) : setExpandedIndex(index);
  };

  const handleNotificationClick = async (item, index) => {
    console.log(item);
    // toggleExpand(index);
    // if (!item.read) {
    //   await userService.readNotification(item.notification_id);
    //   item.read = true;
    // }
    // if (item.notification_url.includes('bill')) {
    //   const selectedRequest = requests?.find(
    //     (request) => request.request_transfer_id === item.object_id
    //   );
    //   dispatch(
    //     getSelectedRequest(selectedRequest as PendingRequestDataInterface)
    //   );
    //   setNotificationType('bill');
    // } else if (item.notification_url.includes('split')) {
    //   let res = await userService.getDebitSplitRequestDetail({
    //     notification_url: item.notification_url,
    //   });

    //   res.split_members = res.split_members.find(
    //     (member) => member.member_id === item.account_user_id
    //   );
    //   setNotificationType('split');
    //   dispatch(getSelectedDebitSplitRequest(res));
    // } else if (item.notification_url.includes('transfers/credit/')) {
    //   const res = await userService.getCreditTransferDetail({
    //     notification_url: item.notification_url,
    //   });
    //   setNotificationType('credit');
    //   dispatch(getSelectedCreditTransfer(res));
    // } else if (item.notification_url.includes('transfers/debit/')) {
    //   const res = await userService.getDebitTransferDetail({
    //     notification_url: item.notification_url,
    //   });
    //   setNotificationType('debit');
    //   dispatch(getSelectedDebitTransfer(res));
    // } else {
    //   // dispatch(getSelectedNotification(item));
    //   console.log("Can't handle notification type yet");
    // }
  };

  useEffect(() => {
    const handlePassedNotification = () => {
      const index = notification?.findIndex(
        (item) => item.notification_id === notification_id
      );
      const notificationItem = notification?.find(
        (notification) => notification.notification_id === notification_id
      );

      if (index !== -1) {
        handleNotificationClick(notificationItem, index);
      }
    };

    handlePassedNotification();
  }, []);

  return (
    <div className="bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-11">
          {notification?.map((item, index) => (
            <div key={index}>
              <div
                className={`flex gap-4 items-center cursor-pointer ${
                  expandedIndex === index ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleNotificationClick(item, index)}
              >
                {item.read ? (
                  <div className="rounded-full w-[11px] h-[11px] read"></div>
                ) : (
                  <div className="rounded-full w-[11px] h-[11px] bg-yellow"></div>
                )}
                <div className="   w-full flex flex-col gap-2 ">
                  <div className=" flex  justify-between   ">
                    <div className="flex">
                      <h2 className=" text-neutral-90 text-t-20 font-semi-mid   ">
                        {item.notification_title}
                      </h2>
                    </div>
                    <div className=" text-t-20 text-neutral-50   ">
                      {' '}
                      {moment(item.created_at).format('MMM D')}{' '}
                    </div>
                  </div>
                  <div className="">
                    <p className=" text-neutral-70 text-t-18  leading-6  ">
                      {' '}
                      {item.notification_body}{' '}
                    </p>
                  </div>
                </div>
              </div>
              {expandedIndex === index && (
                <NotificationDetails notification_type={notificationType} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

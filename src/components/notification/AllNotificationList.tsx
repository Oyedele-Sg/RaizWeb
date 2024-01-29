import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { usePendingRequest } from '@/hooks/request/usePendingRequest';
import { useNotification } from '@/hooks/notification/useNotification';
import {
  getSelectedNotification,
  getSelectedCreditTransfer,
  getSelectedDebitTransfer,
  getSelectedDebitSplitRequest,
  getSelectedRequest,
  getSelectedTargetSaveInvite,
} from '@/shared/redux/features';
import { useAppDispatch, useAppSelector } from '@/shared/redux/types';
import { userService } from '@/services';
import {
  NotificationDataInterface,
  PendingRequestDataInterface,
} from '@/shared';
import { NotificationDetails } from './NotificationDetails';
import './Notification.css';

// Define constants for notification types
const NOTIFICATION_TYPES = {
  BILL_REQUEST: 'bill',
  CREDIT_TRANSFER: 'credit',
  DEBIT_TRANSFER: 'debit',
  SPLIT_REQUEST: 'split',
  TARGET_SAVE_INVITE: 'target_save_invite',
  OTHER: 'other',
  UNKNOWN: '',
};

interface NotificationItemProps {
  notification_id?: string;
  notification_category_id?: number;
  page: number;
}

export function AllNotificationList({
  notification_id,
  notification_category_id,
  page,
}: NotificationItemProps): JSX.Element {
  const notification = useNotification(notification_category_id, page);
  const dispatch = useAppDispatch();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [notificationType, setNotificationType] = useState<string>(
    NOTIFICATION_TYPES.UNKNOWN
  );
  const requests = usePendingRequest();

  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNotificationClick = async (
    item: NotificationDataInterface | undefined,
    index: number | undefined
  ) => {
    toggleExpand(index as number);
    if (!item?.read) {
      if (!item?.notification_id) return;
      await userService.readNotification(item?.notification_id);
      item!.read = true;
    }
    let res;
    //COME BACK TO CHANGE THIS TO item.notification_sub_category_id
    switch (item.notification_sub_category_id) {
      case 6:
        const selectedRequest = requests?.find(
          (request) => request.request_transfer_id === item.object_id
        );
        dispatch(
          getSelectedRequest(selectedRequest as PendingRequestDataInterface)
        );
        setNotificationType(NOTIFICATION_TYPES.BILL_REQUEST);
        break;
      case 2:
        res = await userService.getCreditTransferDetail({
          notification_url: item.notification_url,
        });
        setNotificationType(NOTIFICATION_TYPES.CREDIT_TRANSFER);
        dispatch(getSelectedCreditTransfer(res));
        break;
      case 1:
        res = await userService.getDebitTransferDetail({
          notification_url: item.notification_url,
        });
        setNotificationType(NOTIFICATION_TYPES.DEBIT_TRANSFER);
        dispatch(getSelectedDebitTransfer(res));
        break;
      case 5:
        res = await userService.getDebitSplitRequestDetail({
          notification_url: item.notification_url,
        });

        setNotificationType(NOTIFICATION_TYPES.SPLIT_REQUEST);
        dispatch(getSelectedDebitSplitRequest(res));
        break;
      case 3:
        res = await userService.getTargetSaveInviteDetail({
          notification_url: item.notification_url,
        });

        setNotificationType(NOTIFICATION_TYPES.TARGET_SAVE_INVITE);
        dispatch(getSelectedTargetSaveInvite(res));
        break;
      default:
    }
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
                className={`flex gap-4 items-center cursor-default`}
                onClick={() => handleNotificationClick(item, index)}
              >
                {item.read ? (
                  <div className="rounded-full w-[11px] h-[11px] read"></div>
                ) : (
                  <div className="rounded-full w-[11px] h-[11px] bg-yellow"></div>
                )}
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="flex">
                      <h2 className="text-neutral-90 text-t-20 font-semi-mid">
                        {item.notification_title}
                      </h2>
                    </div>
                    <div className="text-t-20 text-neutral-50">
                      {moment(item.created_at).format('MMM D')}
                    </div>
                  </div>
                  <div>
                    <p className="text-neutral-70 text-t-18 leading-6">
                      {item.notification_body}
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

import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React, { useEffect } from 'react';
import { CreditNotificationDetails } from './CreditNotificationDetails';
import { DebitNotificationDetails } from './DebitNotificationDetails';
import { DebitSplitRequestNotificationDetails } from './DebitSplitRequestNotificationDetails';
import { BillRequestNotificationDetails } from './BillRequestNotificationDetails';
import { TargetSaveInviteNotificationDetails } from './TargetSaveInviteNotificationDetails';
import './Notification.css';

interface NotificationDetailsProps {
  notification_type?: string;
}

export function NotificationDetails({
  notification_type,
}: NotificationDetailsProps) {
  const notificationDetails = useAppSelector(
    (state) => state.selectedNotification
  );

  return (
    <div className="bg-grey  p-8 rounded-lg max-h-[600px] overflow-auto notification_detail">
      <div className="flex flex-col gap-12">
        {notification_type === 'credit' && <CreditNotificationDetails />}

        {notification_type === 'debit' && <DebitNotificationDetails />}
        {notification_type === 'split' && (
          <DebitSplitRequestNotificationDetails />
        )}

        {notification_type === 'bill' && <BillRequestNotificationDetails />}
        {notification_type === 'target_save_invite' && (
          <TargetSaveInviteNotificationDetails />
        )}

        {notification_type === 'other' && (
          <h3>Unable to handle this type of notification yet</h3>
        )}
      </div>
    </div>
  );
}

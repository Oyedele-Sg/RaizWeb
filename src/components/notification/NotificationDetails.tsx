import { useAppSelector } from '@/shared/redux/types';
import moment from 'moment';
import React, { useEffect } from 'react';
import { CreditNotificationDetails } from './CreditNotificationDetails';
import { DebitNotificationDetails } from './DebitNotificationDetails';

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
    <div className="bg-grey border-[2px] border-neutral-20 p-8 rounded-lg max-h-[600px] overflow-auto">
      <div className="flex flex-col gap-12">
        {notification_type === 'credit' && <CreditNotificationDetails />}

        {notification_type === 'debit' && <DebitNotificationDetails />}

        {notification_type === 'other' && (
          <h3>Unable to handle this type of notification yet</h3>
        )}
      </div>
    </div>
  );
}

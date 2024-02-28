'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services';

import { NotificationDataInterface, UserInterface, queryKeys } from '@/shared';
import { useEffect } from 'react';
import { useAppSelector } from '@/shared/redux/types';

async function getNotifications(
  notification_category_id?: number,
  page?: number,
  read?: string
): Promise<NotificationDataInterface[]> {
  let response;
  if (notification_category_id) {
    response = await userService.getNotificationsByID(
      page,
      notification_category_id,
      read
    );
  } else {
    response = await userService.getNotifications(
      notification_category_id,
      page,
      read
    );
  }
  return response;
}

export function useNotification(
  notification_category_id?: number,
  page?: number,
  read?: string
): NotificationDataInterface[] | undefined {
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.notifications];
  if (notification_category_id !== undefined) {
    queryKey.push(notification_category_id.toString());
  }
  if (page !== undefined) {
    queryKey.push(page.toString());
  }
  const { data } = useQuery<NotificationDataInterface[], any>(
    queryKey,
    () => getNotifications(notification_category_id, page, read), // Use a function reference here
    {
      staleTime: 30000,
    }
  );

  useEffect(() => {
    const refetchInterval = setInterval(() => {
      queryClient.invalidateQueries([queryKeys.notifications]);
    }, 30000);

    return () => clearInterval(refetchInterval);
  }, [queryClient]);

  return data;
}

'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services';

import { NotificationDataInterface, UserInterface, queryKeys } from '@/shared';
import { useEffect } from 'react';

async function getNotifications(
  notification_category_id?: number
): Promise<NotificationDataInterface[]> {
  let response = await userService.getNotifications();
  if (notification_category_id) {
    response = await userService.getNotificationsByID(
      '',
      notification_category_id,
      ''
    );
  } else {
    response = await userService.getNotifications();
  }
  return response;
}

export function useNotification(
  notification_category_id?: number
): NotificationDataInterface[] | undefined {
  const queryClient = useQueryClient();
  const queryKey = [queryKeys.notifications];
  if (notification_category_id !== undefined) {
    queryKey.push(notification_category_id.toString());
  }

  // const { data } =
  //   useQuery <
  //   NotificationDataInterface[], any>({
  //     queryKey: queryKey,
  //     queryFn: getNotifications(notification_category_id ?? 0),
  //     staleTime: 30000,
  //   });

  const { data } = useQuery<NotificationDataInterface[], any>(
    queryKey, // Pass the queryKey directly
    () => getNotifications(notification_category_id ?? 0), // Use a function reference here
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

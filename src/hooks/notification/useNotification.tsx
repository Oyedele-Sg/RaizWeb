import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services';

import { NotificationDataInterface, UserInterface, queryKeys } from '@/shared';
import { useEffect } from 'react';

async function getNotifications(): Promise<NotificationDataInterface[]> {
  const response = await userService.getNotifications();
  console.log(response);
  return response;
}

export function useNotification(): NotificationDataInterface[] | undefined {
  const { data } = useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: getNotifications,
  });

  return data;
}

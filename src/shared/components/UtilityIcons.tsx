import React, { useContext } from 'react';
import { IconAvatar, IconLogout, IconNotification, IconScan } from './icons';

import { useRouter } from 'next/navigation';
import { userService } from '@/services';
import { useNotification } from '@/hooks/notification/useNotification';
import moment from 'moment';
import { NotificationDrop } from './NotificationDrop';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CurrentUserContext } from '@/providers/CurrentUserProvider';

interface Props {
  ajo?: boolean;
}

export function UtilityIcons({ ajo }: Props) {
  const Router = useRouter();
  const notification = useNotification();
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="hidden lg:flex items-center gap-[60px]  ">
      <div className=" flex gap-8">
        {ajo ? <IconLogout /> : <IconScan />}

        <div className="relative">
          <IconNotification />

          <NotificationDrop />
        </div>
      </div>

      <div
        className=""
        onClick={() => {
          Router.push(`/settings`);
        }}
      >
        <Avatar className=" cursor-pointer w-[64px] h-[64px]  ">
          <AvatarImage src={currentUser?.profile_image_url} />
          <AvatarFallback className=" text-purple font-bold  uppercase ">
            <IconAvatar />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

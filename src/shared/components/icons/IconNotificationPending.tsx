import {
  setNotificationFalse,
  setNotificationTrue,
} from '@/shared/redux/features';
import { useAppDispatch, useAppSelector } from '@/shared/redux/types';
import { FC, ReactElement } from 'react';
import { useRouter } from 'next/navigation';

export const IconNotificationPending: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const Router = useRouter();
  const isShowing = useAppSelector(
    (state) => state.showNotificationDrop.isShowing
  );

  return (
    <div
      className=""
      onClick={() => {
        Router.push(`/notifications`);
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.7868 19.32L24.4534 17.1066C24.1734 16.6133 23.9201 15.68 23.9201 15.1333V11.76C23.9201 8.62663 22.0801 5.91996 19.4268 4.65329C18.7334 3.42663 17.4534 2.66663 15.9868 2.66663C14.5334 2.66663 13.2268 3.45329 12.5334 4.69329C9.93342 5.98663 8.13342 8.66663 8.13342 11.76V15.1333C8.13342 15.68 7.88009 16.6133 7.60009 17.0933L6.25342 19.32C5.72009 20.2133 5.60009 21.2 5.93342 22.1066C6.25342 23 7.01342 23.6933 8.00009 24.0266C10.5868 24.9066 13.3068 25.3333 16.0268 25.3333C18.7468 25.3333 21.4668 24.9066 24.0534 24.04C24.9868 23.7333 25.7068 23.0266 26.0534 22.1066C26.4001 21.1866 26.3068 20.1733 25.7868 19.32Z"
          fill="#4B0082"
        />
        <path
          d="M19.7736 26.68C19.2136 28.2266 17.7336 29.3333 16.0002 29.3333C14.9469 29.3333 13.9069 28.9066 13.1736 28.1466C12.7469 27.7466 12.4269 27.2133 12.2402 26.6666C12.4136 26.6933 12.5869 26.7066 12.7736 26.7333C13.0802 26.7733 13.4002 26.8133 13.7202 26.84C14.4802 26.9066 15.2536 26.9466 16.0269 26.9466C16.7869 26.9466 17.5469 26.9066 18.2936 26.84C18.5736 26.8133 18.8536 26.8 19.1202 26.76C19.3336 26.7333 19.5469 26.7066 19.7736 26.68Z"
          fill="#4B0082"
        />
        <path
          d="M16 9C18.2091 9 20 7.20914 20 5C20 2.79086 18.2091 1 16 1C13.7909 1 12 2.79086 12 5C12 7.20914 13.7909 9 16 9Z"
          fill="#B3261E"
        />
      </svg>
    </div>
  );
};

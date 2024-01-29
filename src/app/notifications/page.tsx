'use client';
import { AllNotificationList } from '@/components/notification';
import { useNotification } from '@/hooks/notification/useNotification';
import {
  BackArrow,
  NextArrow,
  BackBtnCircle,
  NotificationDataInterface,
  NotificationCategoryInterface,
} from '@/shared';
import {
  getSelectedNotification,
  setPaginationPage,
} from '@/shared/redux/features';
import { useAppDispatch, useAppSelector } from '@/shared/redux/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userService } from '@/services';
import React, { useState, useEffect } from 'react';
import { toastMessage } from '@/utils/helpers';

function page() {
  const Router = useRouter();
  const page = useAppSelector((state) => state.notifcationPagination.page);
  const notification = useNotification(1, page);
  const [detail, setDetail] = useState<NotificationDataInterface>();
  const [selectedNotificationType, setSelectedNotificationType] =
    useState<NotificationCategoryInterface>();
  const [notificationCategories, setNotificationCategories] =
    useState<NotificationCategoryInterface[]>();
  const [notificationDrop, setNotificationDrop] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleSortByChange = (
    notificationDrop: boolean,
    notificationCategory?: NotificationCategoryInterface
  ) => {
    setSelectedNotificationType(notificationCategory);
    setNotificationDrop(notificationDrop);
  };

  const notificationDetails = useAppSelector(
    (state) => state.selectedNotification
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getNotificationCategories();
        setNotificationCategories(response);
      } catch (error) {
        toastMessage('Something Went Wrong', `${error}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col gap-3 ">
      <div className="flex items-center  ">
        <button
          title="back"
          className=""
          onClick={() => {
            if (
              notificationDetails &&
              !(Object.keys(notificationDetails).length === 0)
            ) {
              dispatch(
                getSelectedNotification({} as NotificationDataInterface)
              );
              return;
            } else {
              Router.back();
            }
          }}
        >
          <BackArrow />
        </button>
        <div className=" w-full  flex justify-between">
          <div className=" flex-1   ">
            <h1 className=" text-purple text-center text-t-24 font-semi-mid  ">
              Notifications
            </h1>
          </div>
          <div
            className=" relative  border border-neutral-40 flex gap-6 p-2 rounded-lg "
            onClick={() => {
              setNotificationDrop(!notificationDrop);
            }}
          >
            <div className=" flex items-center  gap-4 ">
              <div className=" flex items-center gap-2  ">
                <Image
                  src={`/icons/filter.svg`}
                  width={16}
                  height={16}
                  alt=""
                />{' '}
                <span className=" text-neutral-90  text-t-12  ">
                  {' '}
                  {selectedNotificationType?.notification_category_name ||
                    'Sort By'}{' '}
                </span>{' '}
              </div>
              <span>
                {' '}
                <Image
                  alt=""
                  width={16}
                  height={16}
                  src={`/icons/arrow-down-desk.svg`}
                />{' '}
              </span>
            </div>
            {notificationDrop && (
              <div className=" bg-grey w-[160px] absolute  z-[100000000000000] top-[35px] ">
                <div
                  className=" py-2 px-4 capitalize hover:bg-neutral-30  text-purple "
                  onClick={() => handleSortByChange(false, undefined)}
                >
                  all
                </div>
                {notificationCategories?.map((notificationCategory, index) => (
                  <div
                    className=" py-2 px-4 capitalize hover:bg-neutral-30  text-purple "
                    onClick={() =>
                      handleSortByChange(false, notificationCategory)
                    }
                    key={index}
                  >
                    {notificationCategory.notification_category_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <AllNotificationList
        notification_id={notificationDetails.notification_id}
        notification_category_id={
          selectedNotificationType?.notification_category_id || undefined
        }
        page={page}
      />
      <div className="flex items-center  ">
        {page > 1 && (
          <button
            title="back"
            className=""
            onClick={() => dispatch(setPaginationPage(page - 1))}
          >
            <BackArrow />
          </button>
        )}
        {notification && notification.length == 10 && (
          <button
            onClick={() => dispatch(setPaginationPage(page + 1))}
            className=""
          >
            <NextArrow />
          </button>
        )}
      </div>
    </div>
  );
}

export default page;

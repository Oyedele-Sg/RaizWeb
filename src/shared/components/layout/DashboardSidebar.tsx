'use client';
import { getCurrentLink } from '@/shared/redux/features';
import { useAppDispatch, useAppSelector } from '@/shared/redux/types';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const Sidebar = () => {
  const Router = useRouter();
  const pathName = usePathname();
  console.log('path', pathName);
  const dispatch = useAppDispatch();
  const link = useAppSelector((state) => state.sidebarLinks);
  console.log('state', link.state);

  console.log('bolean', pathName === link.state);

  const dashboardIcon = [
    { icon: 'dashboard', link: '/dashboard', title: 'Home' },
    { icon: 'piggy-bank', link: '/savings/hub', title: 'Savings' },
    { icon: 'wallet', link: '/loan', title: 'Savings' },
    { icon: 'ajo', link: '/ajo/hub', title: 'Savings' },
    // { icon: "icon-receipt", link: "/none", title: "Savings" },
  ];
  const mobileSashboardIcon = [
    { icon: 'dashboard', link: '/dashboard', title: 'Home' },
    { icon: 'piggy-bank', link: '/dashboard', title: 'Savings' },
    // { icon: "chart", link: "/dashboard", title: "Analytics" },
    { icon: 'money-tick', link: '/loan', title: 'Loans' },
    { icon: 'profile', link: '/settings', title: 'Profile' },
  ];

  const utilsIcon = ['toggle-off-circle', 'setting'];

  useEffect(() => {
    dispatch(getCurrentLink(pathName));
  }, [pathName]);

  return (
    <aside className=" w-full px-5 py-4 lg:w-[144px]   lg:py-8 lg:h-screen   z-10 fixed  bottom-0 lg:bottom-auto  bg-grey overflow-auto hide-scrollbar ">
      <div className="  flex  lg:flex-col lg:justify-between  lg:h-full">
        <div className=" flex  w-full  lg:flex-col lg:items-center lg:gap-[64px]  ">
          <div
            className="hidden lg:block  "
            onClick={() => Router.push(`/dashboard`)}
          >
            <Image
              src={`/icons/Raiz.svg`}
              width={48}
              height={48}
              alt="pesa icon logo"
            />
          </div>
          <div className=" hidden lg:flex   justify-between w-full lg:items-center lg:flex-col  gap-[52px] ">
            {dashboardIcon.map((icon, index) => (
              <div
                key={index}
                className=""
                onClick={() => {
                  dispatch(getCurrentLink(icon.link));
                  Router.push(icon.link);
                }}
              >
                <Image
                  src={`/icons/${
                    pathName === link.state && icon.link === pathName
                      ? `${icon.icon}-active`
                      : icon.icon
                  }.svg`}
                  width={32}
                  height={32}
                  alt={`dashboard ${icon.title} icon`}
                />
              </div>
            ))}
          </div>
          <div className=" lg:hidden flex   justify-between w-full lg:items-center lg:flex-col  gap-[52px] ">
            {mobileSashboardIcon.map((icon, index) => (
              <div key={index} className=" flex flex-col items-center gap-1 ">
                <Image
                  src={`/icons/${icon.icon}.svg`}
                  width={32}
                  height={32}
                  alt={`dashboard ${icon} icon`}
                />
                <h5 className=" text-neutral-70  ">{icon.title}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className=" hidden lg:flex flex-col items-center gap-[52px] mt-[100px]">
          <div className="">
            <Image
              src={`/icons/toggle-off-circle.svg`}
              width={32}
              height={32}
              alt={`dashboard toggle-off-circle icon`}
            />
          </div>

          <div className="" onClick={() => Router.push('/settings')}>
            <Image
              src={`/icons/setting.svg`}
              width={32}
              height={32}
              alt={`dashboard setting icon`}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

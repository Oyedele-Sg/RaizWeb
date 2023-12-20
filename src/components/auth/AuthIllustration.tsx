'use client';

import { IconRaiz, Logo } from '@/shared';
import Image from 'next/image';
import React from 'react';

interface Props {
  illustrationName: string;
  width: number;
  height: number;
}

const AuthIllustration: React.FC<Props> = ({
  illustrationName,
  width,
  height,
}) => {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    // if (currentUser.onboarding_checklist.ajo) {
    //   Router.push("/ajo/hub")
    // }
    const interval = setInterval(() => {
      setActive((prev) => (prev === 4 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const data = [
    {
      text: 'Bridging the financial divide:',
      span: 'empowering Nigerians with more financial options',
      icon: '0',
    },
    {
      text: 'Effortless Split Billing.',
      span: 'Share Expenses Easily and Accurately with Friends and Family',
      icon: '1',
    },
    {
      text: 'Virtual Card Convenience.',
      span: 'Empower Your Financial Transactions with a Digital Card',
      icon: '2',
    },
    {
      text: 'Comprehensive Analysis:',
      span: 'Gain Insights into Your Financial Activity and Performance',
      icon: '3',
    },
    {
      text: 'Bill Request Made Simple:',
      span: 'Effortlessly Request Payments from Contacts',
      icon: '4',
    },
  ];
  return (
    <div className=" flex flex-col items-center   gap-[144px] mx-[70px] h-full  ">
      {/* logo */}
      <div className=" self-start ">
        <IconRaiz />
      </div>
      {/* illustration */}
      <div className=" flex flex-col  gap-12 items-center auth-illustration">
        <Image
          src={`/illustrations/onboard/${data[active].icon}.svg`}
          width={width}
          height={500}
          alt=""
        />
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className={` rounded-full w-2 h-2 bg-neutral-30 ${
                active === index && `bg-yellow`
              } `}
              onClick={() => setActive(index)}
            ></div>
          ))}
        </div>
        <div className=" px-10 ">
          <p className=" font-title__large  text-neutral-20 text-center ">
            <span className="text-yellow ">{data[active].text}</span>{' '}
            {data[active].span}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;

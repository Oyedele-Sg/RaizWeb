import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  icon: string;
  value: string;
  border?: boolean;
}
export function AccountDetailsItems({ title, icon, value, border }: Props) {
  return (
    <div
      className={` flex  items-center justify-between   pb-4 ${
        border && 'border-b-[1.5px] border-b-neutral-30'
      } `}
    >
      <div className="  flex items-center gap-4  ">
        <Image
          src={`/settings/account/${icon}.svg`}
          alt=""
          width={24}
          height={24}
        />
        <h3 className=" text-neutral-70 text-t-16   "> {title} </h3>
      </div>
      <div>
        <h2 className=" text-t-18  text-purple  "> {value} </h2>
      </div>
    </div>
  );
}

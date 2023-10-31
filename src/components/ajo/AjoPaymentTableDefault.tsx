import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const AjoPaymentTableDefault = () => {
  return (
    <div className=" flex flex-col items-center gap-8  ">
      <Image
        src={`/illustrations/recent-dummy.svg`}
        width={154}
        height={138.3}
        alt=""
      />
      <div className=" flex flex-col gap-3 items-center ">
        <h2 className=" gradient-text font-title__large  ">
          Opps! We hit a snag
        </h2>
        <p className=" text-neutral-90 font-body__large  flex flex-col lg:flex-row items-center gap-3  ">
          Don't worry, we are working on it ....
          {/* <span className=' text-neutral-70 underline  '>
            <Link href='/'> Get started.
          </span> */}
        </p>
      </div>
    </div>
  );
};

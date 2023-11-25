import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const DefaultJoinedAjo = () => {
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
          Opps! You are not part of any AJO.
        </h2>
        <p className=" text-neutral-90 font-body__large  flex flex-col lg:flex-row items-center gap-3  ">
          Create an AJO or join one from the Explore page.
        </p>
      </div>
    </div>
  );
};

export default DefaultJoinedAjo;

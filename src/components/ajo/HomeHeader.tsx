import { UtilityIcons } from '@/shared';
import { useRouter } from 'next/navigation';
import React from 'react';

export function HomeHeader() {
  const Router = useRouter();
  return (
    <header className="  py-12   lg:py-8  ">
      <div className=" flex items-center justify-between ">
        <div className="" onClick={() => Router.push('/ajo')}>
          <h1 className=" font-display__small text-purple font-semi-mid   ">
            Cycle Hub
          </h1>
        </div>

        <UtilityIcons ajo />
      </div>
    </header>
  );
}

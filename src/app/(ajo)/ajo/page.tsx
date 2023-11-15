'use client';

import {
  ActivityItemWrap,
  AjoJoined,
  ExploreAjo,
  FeedComponent,
  HomeHeader,
  SubHeaders,
} from '@/components/ajo';
import SectionHeader from '@/components/ajo/SectionHeader';
import { toast } from '@/components/ui/use-toast';
import { userService } from '@/services';

import {
  AjoDataInterface,
  AuthButton,
  BtnMain,
  Loading,
  WhiteWrap,
} from '@/shared';
import Image from 'next/image';
import React, { use, useContext, useEffect, useState } from 'react';
import { all } from 'axios';
import moment from 'moment';
import { CurrentUserContext } from '@/providers/CurrentUserProvider';
import { useRouter } from 'next/navigation';

export default function Ajo() {
  const { currentUser } = useContext(CurrentUserContext);
  const Router = useRouter();
  useEffect(() => {
    if (!currentUser?.onboarding_checklist?.ajo) {
      Router.push('/ajo/onboard');
    }
  }, []);

  return (
    <>
      <Loading />
      <div className="  ">
        <div className=" py-12 px-5 lg:p-10 ">
          <HomeHeader />
        </div>

        <div className="  lg:p-10 flex gap-10 min-h-full ">
          <div className=" w-full ml-auto mr-0 flex  flex-1 flex-col gap-10   ">
            <ExploreAjo />
            <AjoJoined />
          </div>

          {/* <FeedComponent /> */}
        </div>
      </div>
    </>
  );
}

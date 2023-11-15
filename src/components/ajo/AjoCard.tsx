import { AjoDataInterface, BtnMain } from '@/shared';
import moment from 'moment';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { userService } from '@/services';
import { toast } from '../ui/use-toast';
import { useAppDispatch } from '@/shared/redux/types';
import { setLoadingFalse, setLoadingTrue } from '@/shared/redux/features';
import { useRouter } from 'next/navigation';
import { passwordHash } from '@/utils/helpers';

interface Props {
  ajo: AjoDataInterface;
}
export function AjoCard({ ajo }: Props) {
  const Router = useRouter();
  const dispatch = useAppDispatch();
  const handlleClick = async () => {
    try {
      dispatch(setLoadingTrue());
      await userService.joinAjo(ajo.ajo_id);
      Router.push(`/ajo/join/success`);
      dispatch(setLoadingFalse());
    } catch (error) {
      toast({
        title: 'Something Went Wrong',
        description: `${error}`,
        variant: 'destructive',
        style: {
          backgroundColor: '#f44336',
          color: '#fff',
          top: '20px',
          right: '20px',
        },
        duration: 5000,
      });
      dispatch(setLoadingFalse());
    }
  };

  return (
    <Card className="  p-4 bg-ajo-card rounded-2xl lg:min-w-[292px] flex flex-col gap-6 ">
      <div className=" w-[260px] h-[128px] relative  ">
        <Image src={ajo.image_url} fill={true} alt="" />
      </div>

      <div className="   flex flex-col gap-5  ">
        <div className=" flex items-center justify-between ">
          <div className=" flex items-center  gap-1   ">
            <Image src={'/icons/profile.svg'} width={16} height={16} alt="" />
            <h4 className="  text-purple text-t-12  ">
              {ajo.ajo_cycles.map((cycle) => {
                if (!cycle.has_ended) {
                  return (
                    <div>
                      {cycle.available_slots} /{cycle.number_of_slots}{' '}
                    </div>
                  );
                }
              })}
            </h4>
          </div>
          <div className="  text-purple uppercase  rounded-lg font-font-label__medium   bg-neutral-40 px-2 py-1   ">
            {ajo.public ? 'Public' : 'Private'}
          </div>
        </div>
        <div className=" flex  flex-col gap-3 ">
          <div>
            <h2 className=" text-purple uppercase font-semibold  text-t-16   ">
              {ajo.ajo_name}
            </h2>
          </div>
          <div>
            {ajo.ajo_cycles.map((cycle) => {
              if (!cycle.has_ended) {
                const startDate = moment(cycle.start_date);
                const endDate = moment(cycle.end_date);

                const durationInWeeks = endDate.diff(startDate, 'weeks');
                const durationInMonths = endDate.diff(startDate, 'months');
                return (
                  <div className="text-purple  font-semi-mid flex flex-col gap-2 ">
                    <h3 className="   ">
                      Goal Amount:{' '}
                      <span className=" text-neutral-70 ">
                        ₦{cycle.target_amount}
                      </span>{' '}
                    </h3>
                    <h3 className=" ">
                      Duration:{' '}
                      <span className="text-neutral-70 ">
                        {durationInMonths >= 1
                          ? `${durationInMonths} month(s)`
                          : `${durationInWeeks} week(s)`}
                      </span>{' '}
                    </h3>
                    <h3 className="">
                      {' '}
                      Contribution: ₦{cycle.amount_per_cycle}{' '}
                    </h3>
                  </div>
                );
              }
            })}
          </div>
          <div className="">
            <BtnMain
              btnText=" Join Ajo  "
              btnStyle=" w-full text-center text-grey  bg-gradient-ajo-default  "
              onClick={() => {
                handlleClick();
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

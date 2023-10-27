'use client';
import { HomeHeader } from '@/components/ajo';
import { toast } from '@/components/ui/use-toast';
import { userService } from '@/services';
import {
  AjoCycleInterface,
  AjoDataInterface,
  AjoPaymentCycleInterface,
} from '@/shared';
import Image from 'next/image';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  TableOptions,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';
import AjoPaymentTable from '@/components/ajo/AjoPaymentTable';

function Page() {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const Params = useParams();
  const [ajoDetails, setAjoDetails] = React.useState<AjoDataInterface>();
  const [members, setMembers] = React.useState([]);
  const [ajoPaymentTableDetails, setAjoPaymentTableDetails] =
    React.useState<any>();

  const handleLeaveAjo = async () => {
    try {
      await userService.leaveAjo(Params.ajoID);
      toast({
        title: 'Success',
        description: `You have successfully left the Ajo`,
        variant: 'default',
        style: {
          backgroundColor: '#10B981',
          color: '#fff',
          top: '20px',
          right: '20px',
        },
        duration: 5000,
      });
      Router.push(`/ajo`);
    } catch (error) {}
  };

  const getData = async () => {
    try {
      const response = await userService.getAjoByID(Params.ajoID);
      const members = await userService.getAjoMembers(Params.ajoID);
      const ajo_cycle_id = response?.ajo_cycles[0]?.ajo_cycle_id;
      const ajoPaymentTableDetails = await userService.getAjoPaymentTable(
        ajo_cycle_id
      );
      setAjoDetails(response);
      setMembers(members);
      setAjoPaymentTableDetails(ajoPaymentTableDetails);
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
    }
  };

  useEffect(() => {
    getData();
  }, [Params.ajoID]);
  return (
    <div className=" ">
      <div className=" p-10">
        <HomeHeader />
      </div>

      <div className=" w-full min-h-[360px] relative   ">
        <Image src={'/images/bg.png'} fill={true} alt="" />

        <div className=" absolute top-0  bottom-0 left-0 right-0    p-10 flex  justify-between ">
          <div className="flex gap-8 items-center w-full    ">
            <div
              className=" border-[2px] border-neutral-80 rounded-full p-3 items-center justify-center flex  "
              onClick={() => Router.back()}
            >
              <Image
                src={'/icons/ajo-arrow-left.svg'}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className=" flex w-full  justify-between  ">
              <div className=" text-grey flex flex-col gap-4  ">
                <div className=" flex flex-col  gap-3  ">
                  <h1 className="  font-headline__large font-semibold  ">
                    {ajoDetails?.ajo_name}
                  </h1>
                </div>
                <div className="flex flex-col gap-10 ">
                  <div className=" flex gap-8">
                    <div className=" flex  items-center  gap-2   ">
                      <Image
                        src={'/ajo/money.svg'}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span>{ajoDetails?.ajo_cycles[0].amount_per_cycle}</span>
                    </div>
                    <div className=" flex  items-center  gap-2   ">
                      <Image
                        src={'/ajo/contributors.svg'}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span>
                        {ajoDetails?.ajo_cycles[0].number_of_slots} contributors{' '}
                      </span>
                    </div>
                    <div className=" flex  items-center  gap-2   ">
                      <Image
                        src={'/ajo/frequency.svg'}
                        width={24}
                        height={24}
                        alt=""
                      />
                      <span>
                        {
                          ajoDetails?.ajo_cycles[0].collection_frequency
                            .frequency_name
                        }{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className=" flex  items-center  gap-2 text-grey __green self-end  "
                onClick={() => handleLeaveAjo()}
              >
                <Image src={'/ajo/leave.svg'} width={24} height={24} alt="" />
                <span>Leave</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        <h2 className=" text-purple  font-headline__medium font-semi-mid ">
          {' '}
          Cycles{' '}
        </h2>

        <div>
          <div>
            <AjoPaymentTable
              data={
                ajoPaymentTableDetails.ajo_cycle as AjoPaymentCycleInterface[]
              }
              headers={ajoPaymentTableDetails.headers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

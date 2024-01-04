import { toast } from '@/components/ui/use-toast';
import { userService } from '@/services';
import { BudgetCategoryTransactionInterface } from '@/shared';
import { capitalizeFirstLetter } from '@/utils/helpers';
import moment from 'moment';
import React from 'react';

interface Props {
  budgetID:
    | {
        month_name: string;
        budgetID: string;
        category_name: string;
      }
    | undefined;
}

export function ComponentTwo({ budgetID }: Props) {
  const [data, setData] =
    React.useState<BudgetCategoryTransactionInterface[]>();

  const getData = async () => {
    try {
      const response = await userService.getBudgetCategoryTransaction(
        budgetID?.budgetID as string
      );
      setData(response);
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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" flex flex-col gap-9 ">
      <div className=" flex flex-col gap-1 ">
        <h2 className=" font-display__medium text-purple font-semi-mid ">
          {budgetID?.month_name}
        </h2>
        <p className=" text-neutral-70  font-title__large ">
          {capitalizeFirstLetter(budgetID?.category_name ?? '')}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {data?.map((item, index) => (
          <div className="  flex items-center justify-between   " key={index}>
            <div className=" flex items-center gap-4 ">
              {/* <Image
                src={`/icons/break-down/${
                  item.category ? item.category?.category_name : "others"
                }.svg`}
                alt=''
                width={48}
                height={48}
              /> */}
              <div className=" flex flex-col gap-2 ">
                <h2 className=" font-semi-mid text-t-18 capitalize text-purple ">
                  {item.beneficiary_account_name}
                </h2>
                <p className=" text-neutral-90   ">
                  {moment(item.created_at).format('D MMMM YYYY, h:mmA')}
                </p>
              </div>
            </div>
            <div className="  gradient-text__gold text-t-22  ">
              ₦{item.transaction_amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

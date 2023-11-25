'use client';
import React, { useContext, useEffect } from 'react';
import { SpendingTile } from './SpendingTile';
import { userService } from '@/services';
import { toast } from '../ui/use-toast';
import { IncomeSummarytDataInterface } from '@/shared';
import { CurrentUserContext } from '@/providers/CurrentUserProvider';

export const IncomeSummary = () => {
  const [summary, setSummary] = React.useState<IncomeSummarytDataInterface>();
  const [budget, setBudget] = React.useState(0);
  const spendingTrackingData = [
    {
      type: 'income',
      amount: summary?.total_income,
      icon: 'income',
    },
    {
      type: 'spending',
      amount: summary?.total_expense,
      icon: 'spending',
    },
  ];

  const { currentUser } = useContext(CurrentUserContext);

  const data = async () => {
    if (
      currentUser &&
      !currentUser?.is_bvn_verified &&
      !currentUser?.is_phone_verified
    )
      return;
    try {
      const res = await userService.getIncomeSummary();
      const budgets = await userService.getBudget();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentMonthLimit = budgets.find(
        (budget) =>
          budget.budget_month === currentMonth && budget.year === currentYear
      );
      if (currentMonthLimit) {
        setBudget(
          currentMonthLimit.total_budget - currentMonthLimit.total_spent
        );
      }
      setSummary(res);
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
      });
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="  flex gap-8  ">
      {spendingTrackingData.map((data, index) => (
        <SpendingTile
          key={index}
          data={data}
          style={index === 2 ? 'basis-[150px]' : 'basis-[120px]'}
        />
      ))}

      <SpendingTile
        data={{
          type: 'limit',
          amount: budget,
          icon: 'limit',
        }}
        style={'basis-[150px] basis-[120px]'}
      />
    </div>
  );
};

export default IncomeSummary;

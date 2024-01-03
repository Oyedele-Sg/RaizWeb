import { BudgetDataInterface } from '@/shared';
import { getCurrentMonthNumber, getMonthName } from '@/utils/helpers';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  data: BudgetDataInterface;
}

export function BudgetCard({ data }: Props) {
  const Router = useRouter();

  const cardColor = cardColors[data.budget_month - 1] || ['#DFE6EE', '#D2E1EB'];

  const isCurrentMonth = getCurrentMonthNumber() === data.budget_month;
  const isExceedingBudget = data.total_spent > data.total_budget;

  const textColor = isExceedingBudget ? 'budget-text_red' : 'budget-text_green';
  const amountDifference = Math.abs(data.total_budget - data.total_spent);

  const handleCardClick = () => {
    Router.push(`budget/${data.budget_id}`);
  };

  return (
    <div
      className="pt-8 rounded-lg min-w-[246px]"
      style={{ backgroundColor: cardColor[0] }}
      onClick={handleCardClick}
    >
      <div className="h-[221px] px-[23px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[11px]">
            <Image
              src={`/budget/${data.budget_month}.svg`}
              width={32}
              height={32}
              alt=""
            />
            <h3 className="text-purple">{getMonthName(data.budget_month)}</h3>
          </div>
          {!isCurrentMonth && (
            <div>
              <Image
                src="/icons/add-circle.svg"
                width={24}
                height={24}
                alt=""
              />
            </div>
          )}
        </div>
      </div>

      <div
        className="text-t-18 pl-4 pt-[57px] pr-[50px] h-[180px] rounded-b-lg"
        style={{ backgroundColor: cardColor[1] }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span className="text-neutral-90 budget-label">Budget:</span>
            <span className="font-bold gradient-text__gold">
              ₦{data.total_budget}
            </span>
          </div>
          <div className="flex ">
            <span className="text-neutral-90 budget-label">Total Spent:</span>
            <span className="font-bold gradient-text__gold">
              ₦{data.total_spent}
            </span>
          </div>
          <div className="flex ">
            {isExceedingBudget ? (
              <span className="text-neutral-90 budget-label">Exceed By:</span>
            ) : (
              <span className="text-neutral-90 budget-label">Saved:</span>
            )}
            <span className={`font-bold ${textColor}`}>
              ₦{amountDifference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardColors = [
  ['#DFE6EE', '#D2E1EB'],
  ['#DFEEEA', '#C7E4DD'],
  ['#EEDFE4', '#EBD2D2'],
  ['#E6EEDF', '#DAEBD2'],
  ['#EEE7DF', '#EBE0D2'],
  ['#DFE0EE', '#D2D3EB'],
  ['#DFECEE', '#D2E9EB'],
  ['#E7DFEE', '#DFD2EB'],
  ['#EEDFEA', '#EBD2E5'],
  ['#DFEEEC', '#D2EBE3'],
  ['#DFEEE2', '#D6EBD2'],
  ['#EEDFDF', '#EBD2DA'],
];

import React from 'react';
import {
  AjoPaymentCycleInterface,
  AjoPaymentCycleMemberInterface,
} from '@/shared';
import { AjoPaymentTableDefault } from './AjoPaymentTableDefault';

interface Props {
  data: AjoPaymentCycleInterface[];
  headers: string[];
}

const AjoPaymentTable: React.FC<Props> = ({ data, headers }) => {
  const renderHeaders = (tableHeaders: string[]) => {
    return (
      <tr>
        <th className="capitalize font-body__large text-purple cursor-pointer">
          Name
        </th>
        {tableHeaders.map((date, index) => (
          <th key={index} className="capitalize font-body__large text-purple">
            {date}
          </th>
        ))}
        <th className="capitalize font-body__large text-purple">
          Slot Position
        </th>
      </tr>
    );
  };

  const renderTableRow = (
    cycleMembers: AjoPaymentCycleMemberInterface[],
    tableHeaders: string[]
  ) => {
    return cycleMembers.map((member) => (
      <tr
        key={member.account_user_id}
        className={member.number_of_payments_due ? '' : 'selected'}
      >
        <td className="capitalize font-body__large text-purple cursor-pointer">
          {`${member.account_user.first_name} ${member.account_user.last_name}`}
        </td>
        {tableHeaders.map((header, index) => (
          <td key={index} className="capitalize font-body__large text-purple">
            {index < member.number_of_payments_due ? (
              <input type="checkbox" checked={true} disabled={true} />
            ) : (
              <input type="checkbox" checked={false} disabled={true} />
            )}
          </td>
        ))}
        <td className="capitalize font-body__large text-purple">
          {member.slot_position + 1}
        </td>
      </tr>
    ));
  };

  // Check if data is available before rendering
  if (!data || data.length === 0) {
    return <AjoPaymentTableDefault />;
  }

  return (
    <div className="max-w-full min-w-[500px] overflow-x-auto">
      <table
        style={{
          height: '400px',
          maxWidth: '100%',
          minWidth: '500px',
          overflowX: 'auto',
        }}
      >
        <thead>{renderHeaders(headers)}</thead>
        <tbody>{renderTableRow(data[0].ajo_cycle_members, headers)}</tbody>
      </table>
    </div>
  );
};

export default AjoPaymentTable;

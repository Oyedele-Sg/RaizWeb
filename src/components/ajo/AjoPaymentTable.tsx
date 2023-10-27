import React from 'react';
import {
  AjoPaymentCycleInterface,
  AjoPaymentCycleMemberInterface,
} from '@/shared';
import { AjoPaymentTableDefault } from './AjoPaymentTableDefault';

interface Props {
  data: AjoPaymentCycleInterface[];
  headers: string[]; // Add the headers prop
}

const AjoPaymentTable: React.FC<Props> = ({ data, headers }) => {
  const renderHeaders = (tableHeaders: string[]) => {
    return (
      <tr>
        <th>Name</th>
        {tableHeaders.map((date, index) => (
          <th key={index}>{date}</th>
        ))}
        <th>Slot Position</th>
      </tr>
    );
  };

  const renderTableRow = (
    cycleMembers: AjoPaymentCycleMemberInterface[],
    tableHeaders: string[]
  ) => {
    return cycleMembers.map((member) => (
      <tr key={member.account_user_id}>
        <td>{`${member.account_user.first_name} ${member.account_user.last_name}`}</td>
        {tableHeaders.map((header, index) => (
          <td key={index}>
            {index < member.number_of_payments_due ? (
              <input type="checkbox" checked={true} disabled={true} />
            ) : (
              <input type="checkbox" checked={false} disabled={true} />
            )}
          </td>
        ))}
        <td>{member.slot_position + 1}</td>
      </tr>
    ));
  };

  // Check if data is available before rendering
  if (!data || data.length === 0) {
    return <AjoPaymentTableDefault />;
  }

  return (
    <table>
      <thead>{renderHeaders(headers)}</thead>
      <tbody>
        {data.map((cycle) => (
          <React.Fragment key={cycle.ajo_id}>
            {renderTableRow(cycle.ajo_cycle_members, headers)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default AjoPaymentTable;

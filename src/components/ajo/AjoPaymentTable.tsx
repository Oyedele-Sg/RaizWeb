import React from "react"
import {
  AjoPaymentCycleInterface,
  AjoPaymentCycleMemberInterface,
} from "@/shared"
import { AjoPaymentTableDefault } from "./AjoPaymentTableDefault"
import Image from "next/image"
import "./AjoPaymentTable.css"

interface Props {
  data: AjoPaymentCycleInterface[]
  headers: string[]
}

const AjoPaymentTable: React.FC<Props> = ({ data, headers }) => {
  const renderHeaders = (tableHeaders: string[]) => {
    return (
      <tr>
        <th className='capitalize font-body__large text-purple cursor-default'>
          Name
        </th>
        {tableHeaders.map((date, index) => (
          <th key={index} className='capitalize font-body__large text-purple'>
            {date}
          </th>
        ))}
        <th className='capitalize font-body__large text-purple'>
          Slot Position
        </th>
      </tr>
    )
  }

  const renderTableRow = (
    cycleMembers: AjoPaymentCycleMemberInterface[],
    tableHeaders: string[]
  ) => {
    return cycleMembers.map((member) => (
      <tr
        key={member.account_user_id}
        className={member.number_of_payments_due ? "" : "selected"}
      >
        <td className='capitalize font-body__large text-neutral-100 cursor-default center '>
          {`${member.account_user.first_name} ${member.account_user.last_name}`}
        </td>
        {tableHeaders.map((header, index) => (
          <td key={index} className='capitalize font-body__large text-purple '>
            {index < member.number_of_payments_due ? (
              <div className='  flex items-center justify-center '>
                <Image
                  src={`/ajo/check.svg`}
                  width={28}
                  height={28}
                  alt=''
                  className='items-center justify-center flex  '
                />
              </div>
            ) : (
              <div className='  flex items-center justify-center '>
                <Image
                  src={`/ajo/tick-square.svg`}
                  width={28}
                  height={28}
                  alt=''
                />
              </div>
            )}
          </td>
        ))}
        <td className='capitalize font-body__large text-neutral-100'>
          {member.slot_position + 1}
        </td>
      </tr>
    ))
  }

  // Check if data is available before rendering
  if (!data || data.length === 0) {
    return <AjoPaymentTableDefault />
  }

  return (
    <div className='ajo-payment-table-container'>
      <div className='ajo-payment-table-wrapper'>
        <table className='ajo-payment-table'>
          <thead>{renderHeaders(headers)}</thead>
          <tbody>{renderTableRow(data[0].ajo_cycle_members, headers)}</tbody>
        </table>
      </div>
    </div>
  )
}

export default AjoPaymentTable

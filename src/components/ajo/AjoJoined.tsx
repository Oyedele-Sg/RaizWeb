"use client"

import React from "react"
import SectionHeader from "./SectionHeader"
import Image from "next/image"
import { AjoDataInterface, BtnMain } from "@/shared"
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
} from "@tanstack/react-table"

import moment from "moment"
import { userService } from "@/services"
import { useRouter } from "next/navigation"
import DefaultJoinedAjo from "./DefaultJoinedAjo"
import { AjoPaymentTableDefault } from "./AjoPaymentTableDefault"

export function AjoJoined() {
  const Router = useRouter()
  const [data, setData] = React.useState<AjoDataInterface[]>([])

  const columns: ColumnDef<AjoDataInterface>[] = [
    {
      accessorKey: "ajo_id",
      header: "Name",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

        return (
          <div
            className='capitalize font-body__large text-purple cursor-pointer'
            onClick={() => Router.push(`/ajo/${ajo?.ajo_id}/details`)}
          >
            {ajo?.ajo_name}
          </div>
        )
      },
    },
    {
      accessorKey: "ajo_id",
      header: "Status",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

        return (
          <div
            className={`capitalize   text-center  font-body__large px-2 py-1 rounded-lg ${
              ajo?.ajo_cycles[0].has_started
                ? " text-[#00BFA3] bg-ajo-live"
                : ajo?.ajo_cycles[0].has_ended
                ? " text-error bg-ajo-end "
                : " text-[#BF6700] bg-ajo-pending  "
            }   `}
          >
            {ajo?.ajo_cycles[0].has_started
              ? "Live"
              : ajo?.ajo_cycles[0].has_ended
              ? "Ended"
              : "Pending"}
          </div>
        )
      },
    },

    {
      accessorKey: "ajo_start_date",
      header: "Start Date",
      cell: ({ row }) => (
        <div className='capitalize font-body__large text-purple  '>
          {moment(row.getValue("created_at") as any).format("DD-MM-YY")}
        </div>
      ),
    },
    {
      accessorKey: "ajo_id",
      header: "Duration",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))
          ?.ajo_cycles[0]

        const startDate = moment(ajo?.start_date)
        const endDate = moment(ajo?.end_date)

        const durationInWeeks = endDate.diff(startDate, "weeks")
        const durationInMonths = endDate.diff(startDate, "months")

        return (
          <div className='capitalize font-body__large text-purple  '>
            {durationInMonths >= 1
              ? `${durationInMonths} months`
              : `${durationInWeeks} weeks`}
          </div>
        )
      },
    },
    {
      accessorKey: "ajo_id",
      header: "Frequency",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))
          ?.ajo_cycles[0].collection_frequency.frequency_name

        return (
          <div className='capitalize font-body__large text-purple  '>{ajo}</div>
        )
      },
    },

    {
      accessorKey: "ajo_id",
      header: "Amount",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

        return (
          <div className='capitalize bg-gradient-ajo-default text-grey text-center font-body__large px-4 py-2 rounded-lg  '>
            ₦{ajo?.ajo_cycles[0].target_amount.toLocaleString()}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  React.useEffect(() => {
    const getAjoJoined = async () => {
      try {
        const response = await userService.getMyAjo()
        setData(response)
      } catch (error) {}
    }
    getAjoJoined()
  }, [])

  return (
    <div>
      <div className='  py-8 px-6  bg-grey  flex  flex-col gap-8'>
        <div className=' flex justify-between items-center '>
          <SectionHeader text='All Ajo joined ' />
          <BtnMain
            btnText='Create Ajo'
            btnStyle=' bg-purple py-3 px-[35.5px]  flex items-center gap-2 text-grey  '
            onClick={() => Router.push("/ajo/create")}
          >
            <div className='  '>
              <Image
                src={`/icons/add-circle.svg`}
                width={16}
                height={16}
                alt=''
              />
            </div>
          </BtnMain>
        </div>

        {!data || data.length === 0 ? (
          <AjoPaymentTableDefault />
        ) : (
          <div className='container mx-auto overflow-x-auto '>
            <table className='min-w-full  overflow-x-auto'>
              <thead className=' border-b-neutral-30 border-b text-neutral-80 ajo-joined-table-header text-left '>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className=''>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className='py-2 px-4'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className='hover:bg-gray-100'>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='py-2 px-4'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from "moment"
import { userService } from "@/services"
import { useRouter } from "next/navigation"
import DefaultJoinedAjo from "./DefaultJoinedAjo"

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
            onClick={() => Router.push(`/ajo/${ajo?.ajo_id}`)}
          >
            {ajo?.ajo_name}
          </div>
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
  ]

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      
      <div className=''>
        <div className=' max-w-full min-w-[500px] overflow-x-auto '>
          <Table className=' overflow-x bug min-w-full '>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    <DefaultJoinedAjo />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

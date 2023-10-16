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
  TableOptions,
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

export function AjoJoined() {
  const Router = useRouter()
  const [data, setData] = React.useState<AjoDataInterface[]>([])

  const columns: ColumnDef<AjoDataInterface>[] = [
    // {
    //   id: "ajo_name",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "ajo_id",
      header: "Name",
      cell: ({ row }) => {
        const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

        return (
          <div
            className='capitalize'
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
          <div className='capitalize'>{ajo?.ajo_cycles[0].target_amount}</div>
        )
      },
    },

    {
      accessorKey: "ajo_start_date",
      header: "Start Date",
      cell: ({ row }) => (
        <div className='capitalize'>
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
          <div className='capitalize'>
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

        return <div className='capitalize'>{ajo}</div>
      },
    },
    // {
    //   accessorKey: "public",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className='capitalize'>{row.getValue("public")}</div>
    //   ),
    // },
    // {
    //   accessorKey: "email",
    //   header: ({ column }) => {
    //     return (
    //       <Button
    //         variant="ghost"
    //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //       >
    //         Email
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     )
    //   },
    //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    // },
    // {
    //   accessorKey: "amount",
    //   header: () => <div className='text-right'>Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"))

    //     // Format the amount as a dollar amount
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount)

    //     return <div className='text-right font-medium'>{formatted}</div>
    //   },
    // },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
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
          btnStyle=' bg-purple py-3 px-[35.5px]  flex item-center gap-2 text-grey  '
          onClick={() => Router.push("/ajo/create")}
        >
          <Image src={`/icons/add-circle.svg`} width={16} height={16} alt='' />
        </BtnMain>
      </div>

      <div className=''>
        <Table>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"
import { HomeHeader } from "@/components/ajo"
import { toast } from "@/components/ui/use-toast"
import { userService } from "@/services"
import { AjoCycleInterface, AjoDataInterface } from "@/shared"
import Image from "next/image"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import React, { useEffect, useMemo } from "react"
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

function Page() {
  const Router = useRouter()
  const searchParams = useSearchParams()
  const Params = useParams()
  console.log(" seach ", searchParams)
  console.log(" params ", Params.ajoID)
  const [ajoDetails, setAjoDetails] = React.useState<AjoDataInterface>()
  const [members, setMembers] = React.useState([])
  console.log("members", members)

  console.log("ajoDetails", ajoDetails)

  const handleLeaveAjo = async () => {
    try {
      await userService.leaveAjo(Params.ajoID)
      toast({
        title: "Success",
        description: `You have successfully left the Ajo`,
        variant: "default",
        style: {
          backgroundColor: "#10B981",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
      Router.push(`/ajo`)
    } catch (error) {}
  }

  const getData = async () => {
    try {
      const response = await userService.getAjoByID(Params.ajoID)
      const members = await userService.getAjoMembers(Params.ajoID)
      setAjoDetails(response)
      setMembers(members)
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: `${error}`,
        variant: "destructive",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
          top: "20px",
          right: "20px",
        },
        duration: 5000,
      })
    }
  }

  useEffect(() => {
    getData()
  }, [Params.ajoID])

  // const columns: ColumnDef<AjoCycleInterface>[] = [
  //   {
  //     accessorKey: "ajo_id",
  //     header: "Name",
  //     cell: ({ row }) => {
  //       const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

  //       return (
  //         <div
  //           className='capitalize'
  //           onClick={() => Router.push(`/ajo/${ajo?.ajo_id}`)}
  //         >
  //           {ajo?.ajo_name}
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     accessorKey: "ajo_id",
  //     header: "Amount",
  //     cell: ({ row }) => {
  //       const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))

  //       return (
  //         <div className='capitalize'>{ajo?.ajo_cycles[0].target_amount}</div>
  //       )
  //     },
  //   },

  //   {
  //     accessorKey: "ajo_start_date",
  //     header: "Start Date",
  //     cell: ({ row }) => (
  //       <div className='capitalize'>
  //         {moment(row.getValue("created_at") as any).format("DD-MM-YY")}
  //       </div>
  //     ),
  //   },
  //   {
  //     accessorKey: "ajo_id",
  //     header: "Duration",
  //     cell: ({ row }) => {
  //       const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))
  //         ?.ajo_cycles[0]

  //       const startDate = moment(ajo?.start_date)
  //       const endDate = moment(ajo?.end_date)

  //       const durationInWeeks = endDate.diff(startDate, "weeks")
  //       const durationInMonths = endDate.diff(startDate, "months")

  //       return (
  //         <div className='capitalize'>
  //           {durationInMonths >= 1
  //             ? `${durationInMonths} months`
  //             : `${durationInWeeks} weeks`}
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     accessorKey: "ajo_id",
  //     header: "Frequency",
  //     cell: ({ row }) => {
  //       const ajo = data.find((ajo) => ajo.ajo_id === row.getValue("ajo_id"))
  //         ?.ajo_cycles[0].collection_frequency.frequency_name

  //       return <div className='capitalize'>{ajo}</div>
  //     },
  //   },
  // ]

  // const data = useMemo(() => ajoDetails?.ajo_cycles, [ajoDetails?.ajo_cycles])

  // const table = useReactTable({
  //   data,
  //   columns,

  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  // })

  // const { ajoID } = router

  return (
    <div className=' '>
      <div className=' p-10'>
        <HomeHeader />
      </div>

      <div className=' w-full min-h-[360px] relative   '>
        <Image src={"/images/bg.png"} fill={true} alt='' />

        <div className=' absolute top-0  bottom-0 left-0 right-0  bug  p-10 flex items-center '>
          <div className='flex gap-8 items-center   '>
            <div
              className=' border-[2px] border-neutral-80 rounded-full p-3 items-center justify-center flex  '
              onClick={() => Router.back()}
            >
              <Image
                src={"/icons/ajo-arrow-left.svg"}
                width={48}
                height={48}
                alt=''
              />
            </div>
            <div className=' text-grey flex flex-col gap-4 bug   '>
              <div className=' flex flex-col  gap-3  '>
                <h1 className='  font-headline__large font-semibold  '>
                  {ajoDetails?.ajo_name}
                </h1>
                {/* <p className=' font-title__small font-semi-mid '>
                  By Khadijah Arowosegbe
                </p> */}
              </div>

              <div className='flex flex-col gap-10 '>
                {/* <p className=' max-w-[700px] '>
                  This Ajo group(Earlystarter) was created for a total
                  participant of 4 to contribute ₦50,000 for the span of 4
                  months to get a total of ₦200,000
                </p> */}

                <div className=' flex gap-8'>
                  <div className=' flex  items-center  gap-2   '>
                    <Image
                      src={"/ajo/money.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>{ajoDetails?.ajo_cycles[0].amount_per_cycle}</span>
                  </div>

                  <div className=' flex  items-center  gap-2   '>
                    <Image
                      src={"/ajo/contributors.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>
                      {ajoDetails?.ajo_cycles[0].number_of_slots} contributors{" "}
                    </span>
                  </div>

                  <div
                    className=' flex  items-center  gap-2 text-grey  '
                    onClick={() => handleLeaveAjo()}
                  >
                    <Image
                      src={"/ajo/leave.svg"}
                      width={24}
                      height={24}
                      alt=''
                    />
                    <span>Leave</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=' flex  items-center  gap-2   '>
            <Image src={"/ajo/frequency.svg"} width={24} height={24} alt='' />
            <span>
              {ajoDetails?.ajo_cycles[0].collection_frequency.frequency_name}{" "}
            </span>
          </div>
        </div>
      </div>

      <div className='p-10'>
        <h2 className=' text-purple  font-headline__medium font-semi-mid '>
          {" "}
          Cycles{" "}
        </h2>

        <div>
          {/* <Table>
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
          </Table> */}
        </div>
      </div>
    </div>
  )
}

export default Page

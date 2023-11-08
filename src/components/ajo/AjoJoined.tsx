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
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
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

      {/* <div className='container mx-auto overflow-x-auto '>
        <table className='min-w-full  overflow-x-auto'>
          <thead>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

// import React, { useEffect, useState } from "react";
// import SectionHeader from "./SectionHeader";
// import Image from "next/image";
// import { AjoDataInterface, BtnMain } from "@/shared";
// import moment from "moment";
// import { userService } from "@/services";
// import { useRouter } from "next/navigation";
// import DefaultJoinedAjo from "./DefaultJoinedAjo";

// export function AjoJoined() {
//   const Router = useRouter();
//   const [data, setData] = useState<AjoDataInterface[]>([]);

//   useEffect(() => {
//     const getAjoJoined = async () => {
//       try {
//         const response = await userService.getMyAjo();
//         setData(response);
//       } catch (error) {}
//     };
//     getAjoJoined();
//   }, []);

//   return (
//     <div className="py-8 px-6 bg-gray-200 flex flex-col gap-8">
//       <div className="flex justify-between items-center">
//         <SectionHeader text="All Ajo joined" />
//         <BtnMain
//           btnText="Create Ajo"
//           btnStyle="bg-purple py-3 px-3.5 flex items-center gap-2 text-gray-500"
//           onClick={() => Router.push("/ajo/create")}
//         >
//           <div>
//             <Image src="/icons/add-circle.svg" width={16} height={16} alt="" />
//           </div>
//         </BtnMain>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-gray-300">
//             <tr>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Amount</th>
//               <th className="py-2 px-4">Start Date</th>
//               <th className="py-2 px-4">Duration</th>
//               <th className="py-2 px-4">Frequency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((ajo) => (
//               <tr key={ajo.ajo_id} className="hover:bg-gray-100">
//                 <td className="py-2 px-4">
//                   <div
//                     className="capitalize font-body__large text-purple cursor-pointer"
//                     onClick={() => Router.push(`/ajo/${ajo.ajo_id}`)}
//                   >
//                     {ajo.ajo_name}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4">
//                   <div className="capitalize bg-gradient-ajo-default text-gray text-center font-body__large px-4 py-2 rounded-lg">
//                     ₦{ajo.ajo_cycles[0].target_amount.toLocaleString()}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4">
//                   <div className="capitalize font-body__large text-purple">
//                     {moment(ajo.created_at).format("DD-MM-YY")}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4">
//                   <div className="capitalize font-body__large text-purple">
//                     {ajo.ajo_cycles[0].start_date &&
//                       ajo.ajo_cycles[0].end_date &&
//                       moment(ajo.ajo_cycles[0].end_date).diff(ajo.ajo_cycles[0].start_date, "months") >= 1
//                       ? `${moment(ajo.ajo_cycles[0].end_date).diff(ajo.ajo_cycles[0].start_date, "months")} months`
//                       : `${moment(ajo.ajo_cycles[0].end_date).diff(ajo.ajo_cycles[0].start_date, "weeks")} weeks`}
//                   </div>
//                 </td>
//                 <td className="py-2 px-4">
//                   <div className="capitalize font-body__large text-purple">
//                     {ajo.ajo_cycles[0].collection_frequency.frequency_name}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

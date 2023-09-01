import { BtnMain, IconAddCircle } from "@/shared"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

export function ExpenseTileDummy() {
  const Router = useRouter()
  return (
    <div className='flex flex-col gap-12 '>
      <div className=' mx-auto  flex items-center justify-center'>
        <Image
          src={`/illustrations/expenses-dummy.svg`}
          width={174}
          height={174}
          alt=''
        />
        {/* <PieChart width={800} height={400}>
                <Pie
                  data={chartData}
                  cx={120}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  paddingAngle={5}
                  dataKey='value'
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Pie
                  data={chartData}
                  cx={420}
                  cy={200}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  paddingAngle={5}
                  dataKey='value'
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart> */}
      </div>
      <div className=' flex flex-col items-center gap-3 '>
        <h4 className=' text-[18px] gradient-text font-semi-mid '>
          No Expenses Recorded
        </h4>
        <BtnMain
          btnText=' Top Up '
          btnStyle=' flex items-center  justify-center w-full  gap-2 text-purple font-body__medium  bg-neutral-30 py-3   '
          onClick={() => Router.push("/add-funds")}
        >
          <IconAddCircle />
        </BtnMain>
      </div>
    </div>
  )
}


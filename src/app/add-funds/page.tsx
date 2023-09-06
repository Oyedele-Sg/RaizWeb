import { AddFundsCard, BtnMain, IconPesaColored, Logo } from "@/shared"
import Image from "next/image"
import React from "react"

export default function page() {
  const cardLink = [
    {
      type: "Debit Card",
      illustration: "fund-one",
      subText: "Add funds to your wallet through your debit card",
      link: "/add-funds",
    },
    {
      type: "Bank Transfer",
      illustration: "fund-two",
      subText: "Add funds to your wallet through your bank transfer",
      link: "/add-funds/transfer",
    },
  ]

  return (
    <main className=' flex flex-col  gap-[100px] '>
      <header className=' flex  items-center justify-between lg:pt-16  lg:mx-[72px]   '>
        <div className=' hidden lg:block '>
          <IconPesaColored />
        </div>

        <div className='hidden lg:block'>
          <Image
            src={`/patterns/add-funds-header-pattern.svg`}
            width={234}
            height={48}
            alt=''
          />
        </div>
      </header>

      <section className=' flex flex-col items-center justify-center  gap-6  mx-[37px] lg:mx-0 '>
        <div className=''>
          <h1 className=' font-display__medium text-purple lg:first-letter:text-center '>
            Add Funds to Wallet
          </h1>
          <p className=' font-title__large text-neutral-70 lg:text-center '>
            Debit Card or Bank Transfer
          </p>
        </div>

        <div className=' flex flex-col lg:flex-row gap-12   lg:p-16  rounded-lg   '>
          {cardLink.map((data, index) => (
            <AddFundsCard data={data} key={index} />
          ))}
        </div>
      </section>
    </main>
  )
}

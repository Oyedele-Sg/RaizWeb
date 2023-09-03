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
    <main className=' flex flex-col  gap-[100px]'>
      <header className=' flex  items-center justify-between pt-16  mx-[72px] '>
        <IconPesaColored />

        <div className='hidden lg:block'>
          <Image
            src={`/patterns/add-funds-header-pattern.svg`}
            width={234}
            height={48}
            alt=''
          />
        </div>
      </header>

      <section className=' flex flex-col items-center justify-center  gap-6 '>
        <div className=''>
          <h1 className=' font-display__medium text-purple text-center '>
            Add Funds to Wallet
          </h1>
          <p className=' font-title__large text-neutral-70 text-center '>
            Debit Card {" - "} Bank Transfer
          </p>
        </div>

        <div className=' flex flex-col gap-12   p-16 bg-neutral-30 rounded-lg   '>
          {cardLink.map((data, index) => (
            <AddFundsCard data={data} key={index} />
          ))}
        </div>
      </section>
    </main>
  )
}

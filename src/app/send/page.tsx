import { AddFundsCard, BtnMain, IconPesaColored, Logo } from "@/shared"
import Image from "next/image"
import React from "react"

export default function page() {
  const cardLink = [
    {
      type: "Wallet-to-Wallet",
      illustration: "fund-one",
      subText: " Send funds to another user on Pesa ",
      link: "/send/wallet-transfer",
    },
    {
      type: "External Transfers",
      illustration: "fund-two",
      subText: " Send Funds to external bank accounts   ",
      link: "/send/external-transfer",
    },
  ]

  return (
    <main className=' flex flex-col  gap-[100px]'>
      <header className=' flex  items-center justify-between pt-16  mx-[72px] '>
        <IconPesaColored />

        <Image
          src={`/patterns/add-funds-header-pattern.svg`}
          width={234}
          height={48}
          alt=''
        />
      </header>

      <section className=' flex flex-col items-center justify-center  gap-6 '>
        <div className=''>
          <h1 className=' font-display__medium text-purple text-center '>
            Send Funds
          </h1>
          {/* <p className=' font-title__large text-neutral-70 text-center '>
            Debit Card {"  "} Bank Transfer
          </p> */}
        </div>

        <div className=' flex gap-12   p-16 bg-neutral-30 rounded-lg   '>
          {cardLink.map((data, index) => (
            <AddFundsCard data={data} key={index} />
          ))}
        </div>
      </section>
    </main>
  )
}

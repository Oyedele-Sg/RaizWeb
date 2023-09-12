import { ReactQueryProvider } from "@/shared"
import "./globals.css"
import React from "react"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "RAIZ",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='  '>
        <div className='  '>
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </div>
      </body>
    </html>
  )
}

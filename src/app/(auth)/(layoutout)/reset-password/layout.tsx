import React from "react"

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' flex items-center  justify-center h-screen   '>
      <div className='   '>
        <div className='  '>{children}</div>
      </div>
    </main>
  )
}

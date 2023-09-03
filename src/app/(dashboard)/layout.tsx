import { VerifyModal } from "@/components"
import { DashboardHeader, Sidebar } from "@/shared"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

function Dashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <VerifyModal />
      <div className=' bg-neutral-20 min-h-screen  '>
        <div className=' h-full  '>
          <Sidebar />
          <DashboardHeader />
          <div className='lg:ml-[144px] lg:px-12   '>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Dashboardlayout

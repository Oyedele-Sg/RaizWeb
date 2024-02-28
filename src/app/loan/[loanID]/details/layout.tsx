import CurrentUserProvider from "@/providers/CurrentUserProvider"
import { Sidebar } from "@/shared"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Sidebar />

      <main className=' bg-neutral-20  min-h-screen'>
        <div className=' lg:ml-[144px]  '>{children}</div>
      </main>
    </>
  )
}

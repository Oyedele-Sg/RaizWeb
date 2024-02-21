import CurrentUserProvider from "@/providers/CurrentUserProvider"
import { Sidebar } from "@/shared"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <CurrentUserProvider>
      <main className=' bg-neutral-20  min-h-screen'>
        <div className=''>{children}</div>
      </main>
    </CurrentUserProvider>
  )
}

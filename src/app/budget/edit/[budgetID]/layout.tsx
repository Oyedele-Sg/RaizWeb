import CurrentUserProvider from "@/providers/CurrentUserProvider"
import { IconRaizColored, SetupLayout } from "@/shared"
import { Currency } from "lucide-react"

export const metadata = {
  title: "RAIZ",
  description: "Generated by create next app",
}

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CurrentUserProvider>
        <main>
          <div className=' bg-grey min-h-screen '>
            <SetupLayout bg='bg-profile-1'>
              <div className=' my-[72px] mx-5 lg:mx-[72px] flex flex-col gap-[84px] '>
                <div className=' hidden lg:block '>
                  <IconRaizColored />
                </div>
                <div className=' '>{children}</div>
              </div>
            </SetupLayout>
          </div>
        </main>
      </CurrentUserProvider>
    </>
  )
}

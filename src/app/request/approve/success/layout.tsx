<<<<<<<< HEAD:src/app/request/approve/success/layout.tsx
export default function SuccessLayout({
  children,
}: {
========
interface Props {
>>>>>>>> 84a5c571e355fb0e35e5450bf458aa92e974101a:src/app/(ajo)/layout.tsx
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className=' bg-purple bg-auth-pattern bg-center bg-no-repeat  min-h-screen   '>
      <div className=' mx-auto'>{children}</div>
    </main>
  )
}

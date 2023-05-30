export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' bg-purple bg-auth-pattern bg-center bg-no-repeat  min-h-screen  '>
      <section className="max-w-[1512px] mx-auto" >{children}</section>
    </main>
  )
}

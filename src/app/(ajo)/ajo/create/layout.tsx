export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className=' bg-grey min-h-screen   '>
      <div className=' '>{children}</div>
    </main>
  )
}

export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className=' bg-purple bg-auth-pattern bg-center bg-no-repeat  min-h-screen   '>
        <div className=''>{children}</div>
      </main>
    )
  }
  
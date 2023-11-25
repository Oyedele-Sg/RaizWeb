interface Props {
  children: React.ReactNode
}

export default function OnboardLayout({ children }: Props) {
  return (
    <main className=' bg-purple bg-auth-pattern bg-center bg-no-repeat    min-h-screen '>
      <div className=''>{children}</div>
    </main>
  )
}

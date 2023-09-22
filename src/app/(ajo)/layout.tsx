interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className=' bg-purple bg-auth-pattern bg-center bg-no-repeat  min-h-screen   '>
      <div className='max-w-[1440px] mx-auto'>{children}</div>
    </main>
  )
}

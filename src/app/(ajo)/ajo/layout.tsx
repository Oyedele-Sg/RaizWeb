interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className=' bg-neutral-20  p-10 min-h-screen'>
      <div className=''>{children}</div>
    </main>
  )
}

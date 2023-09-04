export const metadata = {
  title: "RAIZ",
  description: "Generated by create next app",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className=' bg-grey h-full '>
        <div className='min-h-screen'>{children}</div>
      </div>
    </main>
  )
}

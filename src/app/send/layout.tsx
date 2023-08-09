export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function SendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className=' bg-grey min-h-screen '>
        <div className=' '>{children}</div>
      </div>
    </main>
  )
}
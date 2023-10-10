import Navbar from '@/components/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="h-full">{children}</main>
    </>
  )
}
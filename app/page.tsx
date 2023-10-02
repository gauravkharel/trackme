import Navbar from '@/components/Navbar'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <main className=''>Main Page</main>
    </>
  )
}

export default page
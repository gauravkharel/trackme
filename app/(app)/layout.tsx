import Navbar from '@/components/Navbar'
import React, { FC } from 'react'

interface layoutProps {
  
}

const layout = ({children}: {children: React.ReactNode}) => {
  return( 
    <>
        <Navbar />
        {children}
    </>
  )
}

export default layout
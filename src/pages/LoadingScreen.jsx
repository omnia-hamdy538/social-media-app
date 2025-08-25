import { Spinner } from '@heroui/react'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
       <Spinner />;
    </div>
  )
}

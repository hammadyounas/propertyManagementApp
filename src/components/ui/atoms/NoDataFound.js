import Image from 'next/image'
import React from 'react'

export default function NoDataFound() {
  return (
    <div className='w-full mx-auto flex flex-col items-center justify-center opacity-60'>
      <Image src="/assets/images/all-img/no-data.jpg" alt="No Data Found" width={300} height={300} />
      <p>No Records Found in the Database</p>
    </div>
  )
}

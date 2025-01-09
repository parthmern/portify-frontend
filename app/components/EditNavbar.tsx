'use client';
import { House } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'


export const EditNavbar = ({className : newClass} : any) => {
  const navigate = useRouter();
  return (
    <div>
        <div onClick={()=>{navigate.push("/")} } 
        className={`${newClass}  cursor-pointer hover:text-blue-500 transition-all duration-200 text-[#f1f7feb5] geist-sans flex gap-x-2 items-center justify-start pl-5 mt-10`}>
            < House className='size-4 ' />
            <p className=''> Home</p>
        </div>
    </div>
  )
}
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Signup from './Signup'

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-normal text-text bg-background ">
            <Navbar/>
            <div className='w-[100vw] h-[80vh] flex justify-center items-center'>
            <Signup/>
            </div>
        </main>
    )
}

export default page

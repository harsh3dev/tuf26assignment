import React from 'react'
import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";

import { MdAdd } from "react-icons/md";
import Cards from './Cards';

const page = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between text-text bg-background ">
            <Navbar />
            <div className='h-full w-full grid place-items-center'>
                <div className='min-h-screen h-full w-full p-10 '>
                    <div className=' w-full flex justify-between items-center ' >
                        <h1 className='text-3xl font-bold text-left '>
                            All Questions
                        </h1>
                        <Button variant={'ghost'} className=' p-4 rounded-full border border-secondary hover:bg-secondary font-semibold text-lg flex justify-center items-center gap-2 '>
                        <MdAdd />
                            Add Question
                        </Button>
                    </div>
                    <Cards/>
                </div>
            </div>
        </main>
    )
}

export default page

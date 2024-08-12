import { Button } from '@/components/ui/button';
import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";



interface DataProps {
    id: number;
    question: string;
    answer: string;
    created_At: string;
}
interface CardProps {
    data: DataProps;
    className?: string;
}


const Card: React.FC<CardProps> = ({ data, className }) => {
    return (
        <div
			className={`w-full min-h-fit max-h-[40vh] flex flex-col justify-around items-center relative rounded-md border border-secondary text-left p-2 px-4 truncate text-ellipsis   `} >


                <div className='w-full flex flex-col flex-wrap justify-normal items-center gap-4'>
                    <p className=' w-full font-semibold text-wrap text-lg '>
                        {data.question}
                    </p>
                    <p className=' w-full font-medium text-wrap text-base truncate text-ellipsis '>
                        {data.answer.split(' ').slice(0, 30).join(' ')}...
                    </p>
                </div>

                <div className='w-full flex justify-end items-center gap-2 '>
                    <Button variant={'ghost'} className=' group rounded-full min-w-10 h-10 hover:w-fit transition-all duration-200 ease-linear p-1 px-2 hover:bg-gray-200/20 flex justify-center items-center gap-2 ' > 
                    <span className='hidden group-hover:inline-block'>Edit</span> 
                    <MdModeEdit className=' w-4 h-4 ' /> 
                    </Button>
                    <Button variant={'ghost'} className=' rounded-full w-10 h-10 p-1 hover:bg-red-600/20 ' > <MdDeleteOutline className=' text-red-600 w-4 h-4 ' /> </Button>
                </div>
		</div>
    )
}

export default Card

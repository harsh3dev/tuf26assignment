import { Button } from '@/components/ui/button';
import axios from 'axios';
import React from 'react'
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditPost from './EditPost';
import { IoReloadOutline } from "react-icons/io5";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


interface DataProps {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
}
interface CardProps {
    data: DataProps;
    className?: string;
}


const Card: React.FC<CardProps> = ({ data, className }) => {

    const [loading, setLoading] = React.useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/posts/${data.id}`);
            if (response.status === 204) {
                window.location.reload();
                console.log("deleted");
            } else {
                console.error('Failed to delete the quiz');
            }
        } catch (error) {
            console.error('An error occurred while deleting the quiz', error);
        } finally {
            setLoading(false);
            window.location.reload();
            toast.success("Successfully deleted question");
        }
    }


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
                    <EditPost data={data} />
                    {
                        loading ? <IoReloadOutline className=' animate-spin w-4 h-4 ' /> : 
                        <Button onClick={()=>handleDelete()} variant={'ghost'} className=' rounded-full w-10 h-10 p-1 hover:bg-red-600/20 ' > <MdDeleteOutline className=' text-red-600 w-4 h-4 ' /> </Button>
                    }
                    
                </div>
		</div>
    )
}

export default Card

"use client";
import React, {useEffect, useState} from 'react'
import axios from 'axios';

import FlipCard from './FlipCard'

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const nextIndex = () => {
        const index = currentIndex===posts.length-1 ? 0 : currentIndex+1;
        setCurrentIndex(index);
    }

    const prevIndex = () => {
        const index = currentIndex===0 ? posts.length-1 : currentIndex-1;
        setCurrentIndex(index);
    }

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/posts');
                console.log(res.data);
                setPosts(res.data);
                // dispatch(setPosts(res.data.Hackathon));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className='w-full h-full grid place-items-center '>
            <div className='flex justify-center items-center gap-5 p-2 w-full max-w-xl  '>

                <Button variant={'ghost'} className='w-14 h-14 rounded-full text-lg font-bold ' onClick={prevIndex}><GrPrevious className=' w-full h-full rounded-full ' /></Button>
                
                <div className='flex flex-col justify-center items-center gap-4 w-full'>
                    {loading && <Skeleton className={`w-[25vw] h-[50vh] rounded-md `} > </Skeleton>}
                    { !loading &&
                        posts.map((data, index) => {
                            return  currentIndex===index && (
                                <FlipCard key={`Question-${index}`} data={data} className='' />
                            )
                        })
                    }
                    <div className=' flex justify-between items-center gap-1 '>
                        
                        {
                            posts.flatMap((data, index) => {
                                const isActive = currentIndex===index ? 'bg-white' : 'bg-gray-700';
                                return (
                                    <div key={index} onClick={()=>setCurrentIndex(index)} className={` cursor-pointer w-1 h-1 rounded-full p-1 ${isActive} `} >
                                    </div>
                                )

                            })
                        }
                    </div>
                </div>

                <Button variant={'ghost'} className='w-14 h-14 rounded-full text-lg font-bold  ' onClick={nextIndex}><GrNext className=' w-full h-full rounded-full ' /></Button>
            </div>
        </div>
    )
}

export default Slider

const mockData = [
    {
        "id": 6,
        "question": "What is a closure in JavaScript?",
        "answer": "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.",
        "createdAt": "2024-08-12T10:00:00Z"
    },
    {
        "id": 2,
        "question": "How do you create a function in JavaScript?",
        "answer": "You can create a function in JavaScript using the 'function' keyword followed by the function name, parentheses, and curly brackets.",
        "createdAt": "2024-08-12T11:00:00Z"
    },
    {
        "id": 3,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "createdAt": "2024-08-12T12:00:00Z"
    },
    {
        "id": 4,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "createdAt": "2024-08-12T13:00:00Z"
    },
    {
        "id": 5,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "createdAt": "2024-08-12T14:00:00Z"
    }
]

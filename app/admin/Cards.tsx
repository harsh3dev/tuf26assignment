"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';

import { Skeleton } from "@/components/ui/skeleton"




const Cards = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    
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
        <div className=' w-full h-full my-4 rounded-md grid place-items-center '>
            <div className=' w-full h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 '>
                {
                    loading &&(
                        <>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        <Skeleton className={`w-[20vw] h-[30vh] rounded-md `} > </Skeleton>
                        </>
                    )
                }
                { !loading &&
                    posts.map((data, index) => {
                        return (
                            <Card key={`Question-${index}`} data={data} className='' />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards

const mockData = [
    {
        "id": 1,
        "question": "What is a closure in JavaScript?",
        "answer": "A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope.",
        "created_At": "2024-08-12T10:00:00Z"
    },
    {
        "id": 2,
        "question": "How do you create a function in JavaScript?",
        "answer": "You can create a function in JavaScript using the 'function' keyword followed by the function name, parentheses, and curly brackets.",
        "created_At": "2024-08-12T11:00:00Z"
    },
    {
        "id": 3,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed. 'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed. 'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed. 'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "created_At": "2024-08-12T12:00:00Z"
    },
    {
        "id": 4,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "created_At": "2024-08-12T13:00:00Z"
    },
    {
        "id": 5,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "created_At": "2024-08-12T14:00:00Z"
    },
    {
        "id": 6,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "created_At": "2024-08-12T12:00:00Z"
    },
    {
        "id": 7,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "created_At": "2024-08-12T13:00:00Z"
    },
    {
        "id": 8,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "created_At": "2024-08-12T14:00:00Z"
    },
    {
        "id": 9,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "created_At": "2024-08-12T12:00:00Z"
    },
    {
        "id": 10,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "created_At": "2024-08-12T13:00:00Z"
    },
    {
        "id": 11,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "created_At": "2024-08-12T14:00:00Z"
    },
    {
        "id": 12,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "created_At": "2024-08-12T12:00:00Z"
    },
    {
        "id": 13,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "created_At": "2024-08-12T13:00:00Z"
    },
    {
        "id": 14,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "created_At": "2024-08-12T14:00:00Z"
    },
    {
        "id": 15,
        "question": "What is the purpose of the 'this' keyword in JavaScript?",
        "answer": "'this' refers to the object from which a function was called. Its value depends on the context in which the function is executed.",
        "created_At": "2024-08-12T12:00:00Z"
    },
    {
        "id": 16,
        "question": "What is an Immediately Invoked Function Expression (IIFE) in JavaScript?",
        "answer": "An IIFE is a function that is executed immediately after its creation. It's commonly used to limit the scope of variables.",
        "created_At": "2024-08-12T13:00:00Z"
    },
    {
        "id": 17,
        "question": "What is the difference between '==' and '===' in JavaScript?",
        "answer": "'==' checks for equality with type coercion, while '===' checks for equality without type coercion, meaning the types must also be the same.",
        "created_At": "2024-08-12T14:00:00Z"
    }
]

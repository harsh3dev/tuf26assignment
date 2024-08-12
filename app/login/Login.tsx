"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
        control,
    } = useForm<FormData>();

const onSubmit = async (data: FormData) => {

    console.log(data);
    const { email, password } = data;
    try {
            const response = await axios.post('/api/signin', {
            email,
            password
            });
            setCookie(null, 'authToken', response.data.token, {
            path: '/',
            });            
            router.push('/admin');
        } catch (error) {
            console.error('Error signing in', error);
        }
}

    return (
        <div className=' min-w-[30vw] h-[70%] flex justify-center items-center '>
            <div className='w-full h-full p-4 rounded-lg border border-secondary '>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
                    <div>
                        <Label htmlFor="email" className='text-lg font-semibold'>Email</Label>
                        <Input type="email" {...register("email", {required:true})} name="email" id="email" className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none' />
                    </div>
                    <div>
                        <Label htmlFor="password" className='text-lg font-semibold'>Password</Label>
                        <Input type="password" {...register("password", {required:true})} name="password" id="password" className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none' />
                    </div>
                    <Button type="submit" className='w-full bg-primary text-white p-2 rounded-md'>Login</Button>
                </form>
                <p>
                    Create a new account? <a href='/signup' className='text-primary'>Signup</a>
                </p>
                    <p>
                        Test ID: harsh@harsh.com <br/>
                        Password: 123456
                    </p>
            </div>
        </div>
    )
}

export default Login

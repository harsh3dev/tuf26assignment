"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormData = {
    email: string;
    password: string;
    admin: boolean;
};

const Signup = () => {
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
    const { email, password, admin } = data;
    try {
            await axios.post('/api/signup', {
            email,
            password,
            admin
            });
            router.push('/login'); 
        } catch (error) {
            console.error('Error signing up', error);
        }
}

    return (
        <div className=' min-w-[30vw] h-[70%] flex justify-center items-center '>
            <div className='w-full h-full p-4 rounded-lg border border-secondary '>
                <h1 className='text-3xl font-bold text-center'>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
                    <div>
                        <Label htmlFor="email" className='text-lg font-semibold'>Email</Label>
                        <Input type="email" {...register("email", {required:true})} name="email" id="email" className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none' />
                    </div>
                    <div>
                        <Label htmlFor="password" className='text-lg font-semibold'>Password</Label>
                        <Input type="password" {...register("password", {required:true})} name="password" id="password" className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none' />
                    </div>
                    <div className=' flex justify-start items-center gap-4 '>
                        {/* <Checkbox id='admin' {...register("admin", {})} /> */}
                        <input type="checkbox" className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" placeholder="admin" id='admin' {...register("admin")} />
                        <Label htmlFor="admin" className='text-lg font-semibold'>Signup as Admin</Label>
                    </div>
                    <Button type="submit" className='w-full bg-primary text-white p-2 rounded-md'>Signup</Button>
                </form>
                <p>
                    Already have an account? <a href='/login' className='text-primary'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default Signup

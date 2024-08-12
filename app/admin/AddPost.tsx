"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { MdAdd } from "react-icons/md";

import { useForm, SubmitHandler, Form } from 'react-hook-form';
import axios from "axios"
import { useState } from "react"

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



interface DataProps {
    question: string;
    answer: string;
}

export function AddPost() {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<DataProps>();
    const [loading, setLoading] = useState(false);

    const addNewPost = async (data: DataProps) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/posts', data);
            console.log('SUCCESS', response.data);
            setOpen(false);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
            window.location.reload();
            toast.success("Successfully added new question");
        }
    }

    const onSubmit: SubmitHandler<DataProps> = (data) => {
        console.log(data);
        addNewPost(data);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant={'ghost'} className=' p-4 rounded-full border border-secondary hover:bg-secondary font-semibold text-lg flex justify-center items-center gap-2 '>
                <MdAdd />
                Add Question
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Add new question</DialogTitle>
            <DialogDescription>
                Fill in the form below to add a new question to the database.
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} >
            <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-start items-start gap-4">
                <Label htmlFor="question" className="text-right">
                New Question
                </Label>
                <Textarea {...register("question", {required: true})} id="question" name="question" className={`col-span-3 ${errors.question && 'border border-primary'} `} />
                {errors.question && <p className='text-primary'>This field is required</p>}
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
                <Label htmlFor="answer" className="text-right">
                Answer/Explaination
                </Label>
                <Textarea {...register("answer", {required: true})} id="answer" name="answer" className={`col-span-3 ${errors.answer && 'border border-primary'} `} />
                {errors.answer && <p className='text-primary'>This field is required</p>}
            </div>
            </div>
            <DialogFooter>
                {
                    loading ? <Button className="bg-primary hover:bg-secondary text-white" disabled>Adding...</Button> : 
                    <Button type="submit" className="bg-primary hover:bg-secondary text-white" >Add Question</Button>
                }
            
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}

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

import { MdAdd, MdModeEdit } from "react-icons/md";

import { useForm, SubmitHandler, Form } from 'react-hook-form';
import axios from "axios"
import { useState } from "react"



interface DataProps {
    id: number;
    question: string;
    answer: string;
    createdAt: string;
}
interface EditPostProps {
    data: DataProps;
    className?: string;
}


const EditPost: React.FC<EditPostProps> =({data, className}) => {

    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<DataProps>(
        { defaultValues: { question: data.question, answer: data.answer } }
    );

    const [loading, setLoading] = useState(false);

    const handleEditPost = async (fdata: DataProps) => {
        const { question, answer } = fdata;
        try {
            setLoading(true);
            const response = await axios.put(`/api/posts/${data.id}`, {
                question,
                answer,
              });
            console.log('SUCCESS', response.data);
            setOpen(false);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
        }
        finally {
            setLoading(false);
            window.location.reload();
        }
    }

    const onSubmit: SubmitHandler<DataProps> = (fdata) => {
        console.log(fdata);
        handleEditPost(fdata);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button variant={'ghost'} className=' group rounded-full min-w-10 h-10 hover:w-fit transition-all duration-200 ease-linear p-1 px-2 hover:bg-gray-200/20 flex justify-center items-center gap-2 ' > 
            <span className='hidden group-hover:inline-block'>Edit</span> 
            <MdModeEdit className=' w-4 h-4 ' /> 
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit)} >
            <DialogHeader>
            <DialogTitle>Edit question</DialogTitle>
            <DialogDescription>
                Fill in the form below to add a new question to the database.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="flex flex-col justify-start items-start gap-4">
                <Label htmlFor="question" className="text-right">
                Edit Question
                </Label>
                <Textarea {...register("question", {required: true})} id="question" name="question" className={`col-span-3 ${errors.question && 'border border-primary'} `} />
                {errors.question && <p className='text-primary'>This field is required</p>}
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
                <Label htmlFor="answer" className="text-right">
                Edit Answer
                </Label>
                <Textarea {...register("answer", {required: true})} id="answer" name="answer" className={`col-span-3 ${errors.answer && 'border border-primary'} `} />
                {errors.answer && <p className='text-primary'>This field is required</p>}
            </div>
            </div>
            <DialogFooter>
                {
                loading ? <Button className="bg-primary text-white" disabled>Saving...</Button> : <Button type="submit" className="bg-primary hover:bg-secondary text-white" >Save Changes</Button>
                }
            
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    )
}

export default EditPost;
"use client";
import React, { useState} from 'react'
import { Separator } from "@/components/ui/separator"


interface DataProps {
		id: number;
		question: string;
		answer: string;
		createdAt: string;
}
interface FlipCardProps {
		data: DataProps;
		className?: string;
}

const FlipCard:React.FC<FlipCardProps> = ({data, className}) => {
		const [flip, setFlip] = useState(false)

	return (
		<div
			className={`card  min-w-[25vw] min-h-[50vh] w-full max-w-lg flex justify-center items-center relative rounded-md cursor-pointer border border-secondary text-center   ${flip ? 'flip' : ''}`}
			onClick={() => setFlip(!flip)}
		>
			<div title='Click to reveal answer' className="front absolute p-5 text-center text-lg " >
				<div className=" w-full text-left flex flex-col justify-around items-start gap-5">
					<h3 className="text-xl font-bold">Question</h3>
					<Separator />
					<p className=" w-full ">
					{data.question}
					</p>
				</div>
				
			</div>
			<div className="back absolute p-5 text-center text-lg " >
			<div className="text-left flex flex-col justify-around items-start gap-5 w-full ">
					<h3 className="text-xl font-bold">Explaination</h3>
					<Separator />
					<p className=" w-full ">
					{data.answer}
					</p>
				</div>
				</div>
		</div>
	)
}

export default FlipCard

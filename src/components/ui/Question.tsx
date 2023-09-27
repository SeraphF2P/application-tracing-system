import { customQuestionType } from "../../hooks/useCustomQuestion";
import { Additions } from "../Additions";
import Btn from "./Btn";
import Icons from "./Icons";
import { FormEvent, useState } from "react";

interface QuestionProps extends customQuestionType {
	updateHandler: (id: string) => (e: FormEvent) => void;
	deleteVal: (id: string) => void;
}

function Question({ updateHandler, deleteVal, ...props }: QuestionProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div>
			<div className=" items-center justify-between flex p-2  ">
				<div className=" flex flex-col ">
					<p className=" text-gray-500 text-xs">{props.type}</p>
					<h3>{props.question}</h3>
				</div>
				<Btn onClick={() => setIsExpanded((prev) => !prev)} variant="ghost">
					<Icons.edit className="w-6 h-6" />
				</Btn>
			</div>
			<div
				data-isexpanded={isExpanded}
				className=" grid data-[isexpanded='true']:grid-rows-[1fr] transition-[grid-template-rows] duration-500 grid-rows-[0fr]  "
			>
				<form
					onSubmit={updateHandler(props.id)}
					className="flex flex-col gap-4 overflow-hidden"
				>
					<Additions {...props} />
					<div className="  flex justify-between ">
						<Btn
							onClick={() => deleteVal(props.id)}
							className="capitalize"
							theme="alert"
							variant="ghost"
						>
							<Icons.error />
							<span>delete question</span>
						</Btn>
						<Btn type="submit">save</Btn>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Question;

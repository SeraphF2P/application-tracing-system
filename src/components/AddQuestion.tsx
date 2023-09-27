import {
	createQuestionType,
	questionsOpts,
	questionsOptsType,
	questionType,
} from "../hooks/useCustomQuestion";
import { Additions } from "./Additions";
import { Card, CardStyle, Icons, Modale } from "./ui";
import Btn, { BtnProps } from "./ui/Btn";
import { ComponentProps, FormEvent, useId, useState } from "react";

function AddQuestion({
	children,
	createHandler,
	...props
}: BtnProps & {
	createHandler: (val: FormEvent) => void;
}) {
	const [type, setType] = useState<questionType>(questionsOpts[0]);

	return (
		<Modale.root>
			<Modale.Open {...props}>{children}</Modale.Open>
			<Modale.Portal>
				<Modale.Overlayer>
					<Modale.Content
						as={CardStyle}
						className="min-h-[490px] "
						title="questions"
					>
						<form
							onSubmit={createHandler}
							className=" accent-primary max-h-[595px] overflow-y-scroll remove-scroll-bar h-full flex flex-col gap-4  justify-between p-[29px]"
						>
							<FieldSelect
								label="type"
								opts={questionsOpts}
								name="type"
								value={type}
								onChange={(e) => {
									setType(e.target.value as questionType);
								}}
							/>
							<Additions type={type} />
							<div className="flex justify-between py-4">
								<Modale.Close
									className="capitalize"
									theme="alert"
									variant="ghost"
								>
									<Icons.error />
									<span>delete question</span>
								</Modale.Close>
								<Btn type="submit">save</Btn>
							</div>
						</form>
					</Modale.Content>
				</Modale.Overlayer>
			</Modale.Portal>
		</Modale.root>
	);
}

const FieldSelect = ({
	label,
	opts,
	...props
}: { label: string; opts: questionsOptsType } & ComponentProps<"select">) => {
	const id = useId();
	return (
		<div className="flex flex-col gap-2 ">
			<label
				className=" h-[30px] my-2 text-xl font-semibold capitalize"
				htmlFor={id}
			>
				{label}
			</label>
			<select {...props} id={id} className=" rounded-md form-select h-[68px]">
				{opts.map((opt, index) => {
					return (
						<option
							className=" checked:bg-third checked:text-white"
							key={index}
							value={opt}
						>
							{opt}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default AddQuestion;

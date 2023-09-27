import { customQuestionType, questionType } from "../hooks/useCustomQuestion";
import { Btn, CheckBox, Field, Icons } from "./ui";
import { produce } from "immer";
import { useState } from "react";

export const Additions = ({
	type,
	...props
}: { type: questionType } & Partial<customQuestionType>) => {
	const question = props.question || "";
	const choices = props.choices || "[]";
	const disqualify = props.disqualify || "false";
	const other = props.other || "false";
	const maxChoice = props.maxChoice || 0;
	const data = props.date;
	const number = props.number || 0;
	const fileUpload = props.fileUpload || {
		name: "",
		lastModified: 0,
		lastModifiedDate: new Date(),
		size: 0,
		type: "image/jpeg",
		webkitRelativePath: "",
	};
	return (
		<div className="flex flex-col gap-4 ">
			<input type="hidden" value={type} name="type" />
			<Field
				defaultValue={question}
				type="text"
				name="question"
				label="question"
			/>
			{["Dropdown", "Multiple choice"].includes(type) && (
				<MultiChoiceSec choices={choices} other={other} />
			)}
			{["Multiple choice"].includes(type) && (
				<Field
					label="max choice allowed"
					defaultValue={maxChoice}
					name="maxChoice"
					type="number"
				/>
			)}
			{["Yes/No"].includes(type) && (
				<div className=" flex p-4 gap-2">
					<CheckBox name="disqualify" defaultValue={disqualify} />
					<span className=" text-sm ">
						Disqualify candidate if the answer is no
					</span>
				</div>
			)}
			{["Date"].includes(type) && (
				<div className=" flex p-4 gap-2">
					<input defaultValue={data} name="date" type="date" />
					<span className=" text-sm "></span>
				</div>
			)}
			{["Number"].includes(type) && (
				<Field
					label="number"
					name="number"
					defaultValue={number}
					className=" form-input"
					type="number"
				/>
			)}
			{["File upload"].includes(type) && (
				<>
					<Field
						label="file"
						name="fileUpload"
						placeholder={fileUpload.name}
						className=" p-0 file:border-0 file:h-full file:px-4 "
						type="file"
					/>
					{fileUpload && <p className="p-1 ">saved file:{fileUpload.name}</p>}
				</>
			)}
			{["Video question"].includes(type) && <VideoQuestion />}
		</div>
	);
};
function VideoQuestion() {
	const [maxDuration, setMaxDuration] = useState({
		duration: 1,
		unit: 1,
	});

	return (
		<>
			<input
				className="form-input rounded-md h-[68px]"
				type="text"
				name="addition-informition"
				placeholder="additional informition"
			/>
			<div className="flex gap-2">
				<input
					value={maxDuration.duration * maxDuration.unit}
					name="maxDuration"
					type="hidden"
				/>
				<input
					className=" w-1/2 inline form-input rounded-md h-[68px]"
					placeholder="max duration of the video"
					type="number"
					defaultValue={1}
					min={1}
					onChange={(e) =>
						setMaxDuration((prev) => {
							return {
								duration: +e.target.value,
								unit: prev.unit,
							};
						})
					}
				/>
				<select
					defaultValue={1}
					onChange={(e) =>
						setMaxDuration((prev) => {
							return {
								duration: prev.unit,
								unit: +e.target.value,
							};
						})
					}
					className=" w-1/2 inline form-select rounded-md h-[68px]"
				>
					<option value={1}>Seconds</option>
					<option value={60}>Minute</option>
				</select>
			</div>
		</>
	);
}
function MultiChoiceSec(defaultValues: {
	choices: string;
	other: "true" | "false";
}) {
	const [choices, setChoices] = useState<string[] | []>(
		JSON.parse(defaultValues.choices)
	);
	const [content, setContent] = useState<string>("");
	return (
		<div>
			<h3 className=" h-[30px] my-2 text-xl font-semibold capitalize">
				choice
			</h3>
			<div className="flex flex-col gap-4 items-center w-full justify-between">
				{choices &&
					choices.map((choice, index) => {
						return (
							<div
								key={index}
								className="flex items-center w-full justify-between"
							>
								<Icons.linebars className="w-6 h-6 mx-2" />
								<input
									value={choice}
									onChange={(e) =>
										setChoices((prev) =>
											produce(prev, (val) => {
												val[index] = e.target.value;
											})
										)
									}
									className=" rounded-md w-full form-input"
								/>
							</div>
						);
					})}

				<input name="choices" value={JSON.stringify(choices)} type="hidden" />
				<div className="flex items-center w-full justify-between">
					<Icons.linebars className="w-6 h-6 mx-2" />
					<input
						onChange={(e) => setContent(e.target.value)}
						value={content}
						placeholder="type here"
						className=" rounded-md w-full form-input"
						type="text"
					/>
					<Btn
						onClick={() => {
							if (content == "") return;
							setChoices((prev) => [...prev, content]);
							setContent("");
						}}
						className="w-11 h-11 p-0"
						variant="ghost"
					>
						<Icons.plus className="w-6 h-6 " />
					</Btn>
				</div>

				<div className=" flex gap-2 items-center w-full px-2">
					<CheckBox
						defaultValue={defaultValues.other}
						name="other"
						className=" h-4 w-4"
					/>
					<span>enable "other" option</span>
				</div>
			</div>
		</div>
	);
}

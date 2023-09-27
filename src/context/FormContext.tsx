// import { useLocalStorage } from "../hooks/useStorage";
// import { createContext, FormEvent, ReactNode, useContext } from "react";
// import { z } from "zod";

// export const questionsOpts = [
// 	"Paragraph",
// 	"Short answer",
// 	"Yes/No",
// 	"Dropdown",
// 	"Multiple choice",
// 	"Date",
// 	"Number",
// 	"File upload",
// 	"Video question",
// ] as const;
// export type questionsOptsType = typeof questionsOpts;
// export type questionType = questionsOptsType[number];
// export const questionValidator = z.object({
// 	type: z.enum(questionsOpts),
// 	question: z.string().min(1),
// 	choices: z.string().optional().default("[]"),
// 	maxChoice: z.number().optional().default(0),
// 	disqualify: z.enum(["true", "false"]).optional().default("false"),
// 	other: z.enum(["true", "false"]).optional().default("false"),
// 	date: z.string().optional(),
// 	number: z.number().optional(),
// 	fileUpload: z
// 		.object({
// 			name: z.string(),
// 			lastModified: z.number(),
// 			lastModifiedDate: z.date(),
// 			size: z.number(),
// 			type: z.enum(["image/jpeg"]),
// 			webkitRelativePath: z.string(),
// 		})
// 		.optional(),
// });
// export type createQuestionType = z.infer<typeof questionValidator>;
// export interface customQuestionType extends z.infer<typeof questionValidator> {
// 	id: string;
// }
// const Context = createContext<{
// 	customisedQuestions: customQuestionType[];
// 	setCustomisedQuestions: React.Dispatch<
// 		(_val: customQuestionType[]) => customQuestionType[]
// 	>;
// }>({
// 	customisedQuestions: [],
// 	setCustomisedQuestions: () => {},
// });

// export function useFormContext() {
// 	const { customisedQuestions, setCustomisedQuestions } = useContext(Context);
// 	function createQuestion(values: createQuestionType) {
// 		const { choices, ...rest } = values;
// 		setCustomisedQuestions((prev) => [
// 			...prev,
// 			{
// 				id: crypto.randomUUID(),
// 				choices: choices,
// 				...rest,
// 			},
// 		]);
// 	}
// 	function updateQuestion({ id, ...newData }: customQuestionType) {
// 		let index = customisedQuestions.findIndex((question) => question.id === id);
// 		if (index == -1) return;

// 		const { choices, ...rest } = newData;
// 		const question = {
// 			id,
// 			choices: JSON.parse(choices),
// 			...rest,
// 		};
// 		setCustomisedQuestions((prev) => [
// 			...prev.slice(0, index),
// 			question,
// 			...prev.slice(index + 1),
// 		]);
// 	}
// 	function deleteQues(id: string) {
// 		const index = customisedQuestions.findIndex((q) => q.id === id);
// 		if (index == -1) return;
// 		setCustomisedQuestions((prev) => [
// 			...prev.slice(0, index),
// 			...prev.slice(index + 1),
// 		]);
// 	}

// 	return { createQuestion, updateQuestion, deleteQues, customisedQuestions };
// }

// export default function FormContext({ children }: { children: ReactNode }) {
// 	const [customisedQuestions, setCustomisedQuestions] = useLocalStorage(
// 		"customisedQuestions",
// 		[]
// 	);
// 	const submitHandler = (e: FormEvent) => {
// 		e.preventDefault();
// 		const formValues = new FormData(e.target as HTMLFormElement);
// 		const values = Object.fromEntries(formValues.entries());
// 		console.log(values);
// 	};

// 	return (
// 		<Context.Provider value={{ customisedQuestions, setCustomisedQuestions }}>
// 			<div
// 				onSubmit={submitHandler}
// 				className=" flex flex-col gap-8 px-4  sm:justify-start  sm:pl-[calc(113px_+_69px)] pt-[113px]"
// 			>
// 				{children}
// 			</div>
// 		</Context.Provider>
// 	);
// }

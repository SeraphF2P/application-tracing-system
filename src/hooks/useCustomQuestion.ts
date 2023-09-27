import { FormEvent } from "react";
import { useLocalStorage } from "./useStorage";
import { z } from "zod";

export const questionsOpts = [
	"Paragraph",
	"Short answer",
	"Yes/No",
	"Dropdown",
	"Multiple choice",
	"Date",
	"Number",
	"File upload",
	"Video question",
] as const;
export type questionsOptsType = typeof questionsOpts;
export type questionType = questionsOptsType[number];
export const questionValidator = z.object({
	type: z.enum(questionsOpts),
	question: z.string().min(1),
	choices: z.string().optional().default("[]"),
	maxChoice: z.string().optional().default("0"),
	disqualify: z.enum(["true", "false"]).optional().default("false"),
	other: z.enum(["true", "false"]).optional().default("false"),
	date: z.string().optional(),
	number: z.string().optional().default("0"),
	fileUpload: z
		.object({
			name: z.string(),
			lastModified: z.number(),
			lastModifiedDate: z.date(),
			size: z.number(),
			type: z.enum(["image/jpeg"]),
			webkitRelativePath: z.string(),
		})
		.optional(),
});
export type createQuestionType = z.infer<typeof questionValidator>;
export interface customQuestionType extends z.infer<typeof questionValidator> {
	id: string;
}
export function useCustomQuestion({ key }: { key: string }) {
	const [values, setValues] = useLocalStorage(key, []);
	function create(values: createQuestionType) {
		setValues((prev: customQuestionType[] | []) => [
			...prev,
			{
				id: crypto.randomUUID(),
				...values,
			},
		]);
	}
	function update({ id, ...newData }: customQuestionType) {
		let index = values.findIndex(
			(question: customQuestionType) => question.id === id
		);
		if (index == -1) return;
		const question = {
			id,
			...newData,
		};
		setValues((prev: customQuestionType[]) => [
			...prev.slice(0, index),
			question,
			...prev.slice(index + 1),
		]);
	}
	function deleteVal(id: string) {
		const index = values.findIndex((q: customQuestionType) => q.id === id);
		if (index == -1) return;
		setValues((prev: customQuestionType[]) => [
			...prev.slice(0, index),
			...prev.slice(index + 1),
		]);
	}
  const validFormData = (e: FormEvent) => {
		e.preventDefault();
		const formValues = new FormData(e.target as HTMLFormElement);
		const values = Object.fromEntries(formValues.entries());
		return  questionValidator.parse(values);
	};
  
	const createHandler = (e: FormEvent) => {
		const validValues = validFormData(e)
		create(validValues);
	};
  const updateHandler = (id:string) => {
    return (e: FormEvent)=>{
      const validValues = validFormData(e)
      update({ id, ...validValues })
    }
 
	};
	return { deleteVal, values,createHandler,updateHandler } as const;
}

export default useCustomQuestion;

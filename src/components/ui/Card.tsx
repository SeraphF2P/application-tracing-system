import useCustomQuestion, {
	customQuestionType,
} from "../../hooks/useCustomQuestion";
import { cn } from "../../lib/cva";
import AddQuestion from "../AddQuestion";
import Icons from "./Icons";
import Question from "./Question";
import { ComponentProps, forwardRef } from "react";

interface CardProps extends ComponentProps<"div"> {
	title: string;
}
export const CardStyle = forwardRef<HTMLDivElement, CardProps>(
	({ title, children, className }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"max-w-[595px] relative font-poppins flex flex-col overflow-hidden  rounded-3xl    w-full bg-white shadow",
					className
				)}
			>
				<h2 className=" bg-secondery  capitalize font-semibold pl-8 pt-7 pb-6">
					{title}
				</h2>
				{children}
			</div>
		);
	}
);
const Card = ({
	storeKey,
	children,
	title,
}: CardProps & { storeKey: string }) => {
	const { values, createHandler, updateHandler, deleteVal } = useCustomQuestion(
		{
			key: storeKey,
		}
	);
	return (
		<CardStyle title={title}>
			<div className="px-4">
				{children}
				{values &&
					values.map((ques: customQuestionType) => (
						<Question
							updateHandler={updateHandler}
							deleteVal={deleteVal}
							key={ques.id}
							{...ques}
						/>
					))}
				<div>
					<AddQuestion
						createHandler={createHandler}
						className=" p-8 font-semibold"
						variant="ghost"
					>
						<Icons.plus className=" w-6  h-6" />
						<span>add question</span>
					</AddQuestion>
				</div>
			</div>
		</CardStyle>
	);
};
export default Card;

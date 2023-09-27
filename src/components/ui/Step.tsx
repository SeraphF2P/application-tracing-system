import { cn } from "../../lib/cva";
import { FC, PropsWithChildren } from "react";

interface StepProps extends PropsWithChildren {
	isActive?: boolean;
}

const Step: FC<StepProps> = ({ children, isActive }) => {
	return (
		<div
			className={cn(
				"h-full relative font-inter font-medium flex justify-center items-center capitalize px-4",
				{
					"bg-primary text-primary-text ": isActive,
				}
			)}
		>
			<p className="[writing-mode:vertical-rl]  text-center p-2 mn:[writing-mode:horizontal-tb]">
				{children}
			</p>
			<span
				className={cn(
					" hidden bg-primary absolute border-l-red-600 -right-3 bottom-1/2 translate-y-1/2 h-10 w-4 [clip-path:polygon(0_0,100%_50%,0_100%,0_0)]",
					{
						block: isActive,
					}
				)}
			/>
		</div>
	);
};

export default Step;

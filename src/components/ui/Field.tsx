import { cn } from "../../lib/cva";
import { ComponentProps, useId } from "react";

export const Field = ({
	label,
	labelclassName,
	className,
	...props
}: { label: string; labelclassName?: string } & ComponentProps<"input">) => {
	const id = useId();
	return (
		<div className="relative flex flex-col gap-2 ">
			<label
				className={cn(
					" h-[30px] my-2 text-xl font-semibold capitalize",
					labelclassName
				)}
				htmlFor={id}
			>
				{label}
			</label>
			<input
				id={id}
				{...props}
				placeholder="type here"
				className={cn("rounded-md form-input h-[68px]", className)}
			/>
		</div>
	);
};

"use client";

import { ComponentProps, useId, useState } from "react";

export default function SwitchBtn({
	defaultValue,
	...props
}: ComponentProps<"input">) {
	const [isToggled, setIsToggled] = useState(defaultValue === "true");
	const label = isToggled ? "show" : "hide";
	const id = useId();
	return (
		<div className=" flex flex-row-reverse w-24 justify-between ">
			<label className="w-10 font-normal" htmlFor={id}>
				{label}
			</label>
			<div className=" border-[#ccc] border-[0.1px] flex items-center overflow-hidden  px-1 relative w-[49px] h-6 rounded-full ">
				<input
					id={id}
					type="checkbox"
					checked={isToggled}
					value={`${isToggled}`}
					onChange={() => {
						setIsToggled((prev) => !prev);
					}}
					className=" peer bg-white checked:bg-primary transition-colors absolute inset-0 appearance-none  "
					{...props}
				/>
				<span className="border-[#ccc] border-[0.1px] pointer-events-none transition-transform translate-x-[23px] peer-checked:translate-x-0 relative bg-[#F4F4F4] h-[18px] w-[18px] rounded-full" />
			</div>
		</div>
	);
}

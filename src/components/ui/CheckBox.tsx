import { ComponentProps, FC, useState } from "react";

const CheckBox: FC<ComponentProps<"input">> = ({ defaultValue, ...props }) => {
	const [isChecked, setisChecked] = useState(defaultValue === "true");
	return (
		<>
			<input
				type="checkbox"
				className="h-[18px] w-[18px] "
				checked={isChecked}
				value={`${isChecked}`}
				onChange={() => setisChecked((prev) => !prev)}
				{...props}
			/>
		</>
	);
};

export default CheckBox;

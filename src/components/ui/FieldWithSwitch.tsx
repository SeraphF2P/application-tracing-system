import CheckBox from "./CheckBox";
import SwitchBtn from "./SwitchBtn";

interface FieldWithSwitchProps {
	fieldLabel: string;
	checkboxName: string;
	switchName: string;
}

function FieldWithSwitch({
	fieldLabel,
	checkboxName,
	switchName,
}: FieldWithSwitchProps) {
	return (
		<div
			key={fieldLabel}
			className=" text-sm flex justify-between items-center p-4 capitalize  font-semibold"
		>
			<div>{fieldLabel}</div>

			<div className="flex gap-2">
				<div className="  leading-6 flex items-center gap-2 font-normal">
					<CheckBox name={fieldLabel + "." + checkboxName} />
					<span>
						{checkboxName == "internalUse" ? "internal" : checkboxName}
					</span>
				</div>
				<SwitchBtn name={fieldLabel + "." + switchName} />
			</div>
		</div>
	);
}

export default FieldWithSwitch;

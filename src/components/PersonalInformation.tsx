import { Card, FieldWithSwitch } from "./ui";

const data = [
	"firstName",
	"lastName",
	"emailId",
	"phoneNumber",
	"nationality",
	"currentResidence",
	"idNumber",
	"dateOfBirth",
	"gender",
];

const PersonalInformation = () => {
	return (
		<Card title="PersonalInformation" storeKey="personalQuestions">
			<form id="personalInformation" className=" accent-primary  divide-y-2 ">
				{data.map((field) => {
					return (
						<FieldWithSwitch
							checkboxName="internalUse"
							switchName="show"
							key={field}
							fieldLabel={field}
						/>
					);
				})}
			</form>
		</Card>
	);
};

export default PersonalInformation;

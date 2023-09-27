import { Card, FieldWithSwitch } from "./ui";
import { FC } from "react";

interface ProfileProps {}
const data = ["education", "experience", "resume"];
const Profile: FC<ProfileProps> = ({}) => {
	return (
		<Card title="Profile" storeKey="profileQuestions">
			<form
				defaultValue={`true`}
				id="profile"
				className=" accent-primary  divide-y-2 "
			>
				{data.map((field) => {
					return (
						<FieldWithSwitch
							checkboxName="mandatory"
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

export default Profile;

import {
	AdditionalQuestions,
	MainHeader,
	PersonalInformation,
	UploadCoverImage,
} from "./components";
import Profile from "./components/Profile";
import { Btn, Step } from "./components/ui";
import axiosClient from "./lib/axiosClient";
import { useMutation } from "@tanstack/react-query";

function App() {
	const { mutate } = useMutation({
		mutationKey: ["alldata"],
		mutationFn: () => {
			const data = getAllData();
			console.log(data);
			return axiosClient.post(
				`734.8250997795502/programs/neque/application-form`,
				data
			);
		},
	});
	const getFormData = (form: HTMLFormElement) => {
		const formValues = new FormData(form);
		return Object.fromEntries(formValues.entries());
	};
	const getAllData = () => {
		const coverImage = (
			document.getElementById("coverImage") as HTMLInputElement
		).value;
		const personalInformation = document.getElementById(
			"personalInformation"
		) as HTMLFormElement;
		const profile = document.getElementById("profile") as HTMLFormElement;
		const personalQuestions = JSON.parse(
			localStorage.getItem("personalQuestions") || "[]"
		);
		const profileQuestions = JSON.parse(
			localStorage.getItem("profileQuestions") || "[]"
		);
		const customisedQuestions = JSON.parse(
			localStorage.getItem("customisedQuestions") || "[]"
		);
		const data = {
			data: {
				id: crypto.randomUUID(),
				type: "applicationForm",
				attributes: {
					coverImage,
					personalInformation: {
						...getFormData(personalInformation),
						personalQuestions,
					},
					profile: {
						...getFormData(profile),
						profileQuestions,
					},
					customisedQuestions,
				},
			},
		};
		console.log(data);
		return data;
	};
	return (
		<>
			<MainHeader />
			<main className="   min-h-screen flex flex-col  py-[113px]">
				<div className="sm:pl-[calc(113px_+_69px)] bg-white shadow  w-full flex h-[113px] ">
					<Step>program details</Step>
					<Step isActive={true}>application form</Step>
					<Step>workflow</Step>
					<Step>preview</Step>
				</div>
				<div className=" flex flex-col gap-8 px-4  sm:justify-start  sm:pl-[calc(113px_+_69px)] pt-[113px]">
					<UploadCoverImage />
					<PersonalInformation />
					<Profile />
					<AdditionalQuestions />
				</div>
				<Btn
					className="fixed bottom-8 right-4 px-8 py-4 capitalize"
					onClick={() => mutate()}
				>
					submit
				</Btn>
			</main>
		</>
	);
}

export default App;

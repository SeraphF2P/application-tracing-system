import { Card } from "./ui";
import { FC } from "react";

interface AdditionalQuestionsProps {}

const AdditionalQuestions: FC<AdditionalQuestionsProps> = ({}) => {
	return <Card title="Additional questions" storeKey="AdditionalQuestions" />;
};

export default AdditionalQuestions;

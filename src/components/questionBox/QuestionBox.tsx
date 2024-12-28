import { IGeneralQuestions } from "../../types/server";
import ToggleBox from "../toggleBox/ToggleBox";

const QuestionBox = ({ question, answer }: IGeneralQuestions) => {

  return (
    <ToggleBox isOpen={false} title={<span className="font-normal">{question}</span>}>
      <div>
        <p className="px-5 bg-gray-50 py-4 text-sm  ">{answer}</p>
      </div>
    </ToggleBox>
  );
};

export default QuestionBox;

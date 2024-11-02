import { IExercise } from '~/models/IExercise';

export interface FormMultipleChoiceInterface extends IExercise {
    multipleChoice: {
        numberOfQuestions: string | number;
        mark: string | number;
        answers: FormMultipleChoiceAnswerItemInterface[];
        fileQuestionUrl: string;
    };
    answers: FormMultipleChoiceAnswerItemInterface[];
}

export interface FormMultipleChoiceAnswerItemInterface {
    no: number;
    answer: string;
    type:number;
    point:number
}

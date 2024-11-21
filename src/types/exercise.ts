import { ExecireAnswerType } from '~/enums/exercise';
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
    type: number;
    point: number;
}
export interface Ianswer {
    no: number;
    point: number;
    type: ExecireAnswerType;
    answers: string;
}
export interface IanswerScore {
    no: number;
    type: number;
    answer: string;
    point: number;
    correct: boolean;
    correct_answer: string;
    max_point: number;
}
export interface IExercise {
    name?: string;
    time_limit?: number;
    answers?: Ianswer[];
    file?: string;
}
export interface IExerciseDetail {
    _id: string;
    user_id: string;
    exercise_id: string;
    status: number;
    point: number;
    file: string;
    answers?: IanswerScore[];
    question_file: string;
}
export interface ISubmit {
    excirse_id?: string;
    file: string;
    answers: Ianswer[];
}
export interface ISubmitScore {
    exercise_answer_id?: string;
    answers: IanswerScore[];
}

import { RoleStudent } from '~/enums/role_student';
import { ExerciseMode, ExerciseType } from '~/enums/exercise';

export declare interface IExercise {
    class_id: string;
    _id: string;
    name: string;
    password: string;
    created_at: string;
    updated_at: string;
    file: string;
    done_count?: number;
    time_limit: number;
    times_to_do: number;
    deadline: string;
    time_to_enable: string;
    is_test: boolean | number;
    student_role: number;
    point_type: number;
    max_point: number;
    created_by_info: [];
    // student_role: RoleStudent;
    // mode: ExerciseMode;
    // type: ExerciseType;
}
interface answer {
    no: number;
    type: number;
    answer: string;
    point: number;
    correct: boolean;
    correct_answer: string;
    max_point: boolean;
}
interface UserInfo {
    _id: string;
    name: string;
    email: string;
    date_of_birth: Date;
    role: number;
    created_at: Date;
    updated_at: Date;
    verify: number;
    avatar: string;
}
export declare interface MarkExcire {
    _id: string;
    user_id: string;
    exercise_id: string;
    status: number;
    point: number;
    file: string;
    answers: answer[];
    created_at: Date;
    updated_at: Date;
    user_info: UserInfo[];
}

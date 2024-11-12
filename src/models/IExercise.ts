import { RoleStudent } from '~/enums/role_student';
import { ExerciseMode, ExerciseType } from '~/enums/exercise';

export declare interface IExercise {
    class_id: string;
    _id: string;
    name: string;
    password: string;
    created_at: string;
    updated_at:string;
    file:string;
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

export enum ExerciseMode {
    GET_MARK_FOR_FIRST_TIME_TO_DO = 0,
    GET_MARK_FOR_NEWEST = 1,
    GET_HIGHEST_MARK = 2,
}

export enum ExerciseType {
    MULTIPLE_CHOICE = 1,
}

export enum ExerciseStudentRole {
    ONLY_VIEW_SCORE = 1,
    VIEW_MORE_ANSWER = 0,
    NOT_VIEW_SCORE = 2,

}

export const getTextExerciseMode = (mode: ExerciseMode | undefined): string => {
    if (mode === ExerciseMode.GET_MARK_FOR_FIRST_TIME_TO_DO) {
        return 'Lấy điểm lần đầu tiên';
    }
    if (mode === ExerciseMode.GET_HIGHEST_MARK) {
        return 'Lấy điểm cao nhất';
    }
    if (mode === ExerciseMode.GET_MARK_FOR_NEWEST) {
        return 'Lấy điểm gần nhất';
    }
    if (!mode) {
        return '';
    }
    throw new Error('mode not valid');
};

export const getExerciseStudentRole = (mode: ExerciseStudentRole | undefined): string => {
    if (mode === ExerciseStudentRole.ONLY_VIEW_SCORE) {
        return 'Chỉ xem điểm';
    }
    if (mode === ExerciseStudentRole.VIEW_MORE_ANSWER) {
        return 'Xem điểm và đáp án';
    }
    if (mode === ExerciseStudentRole.NOT_VIEW_SCORE) {
        return 'Không được xem điểm';
    }
    if (!mode) {
        return '';
    }
    throw new Error('mode not valid');
};


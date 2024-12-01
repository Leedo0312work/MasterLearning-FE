export enum Role {
    ADMIN = 3,
    TEACHER = 2,
    STUDENT = 1,
}

export enum Verify {
    NOT_VERIFY = 0,
    VERIFIED = 1,
    BLOCKED = 2 ,
}

export const getTextRole = (mode: Role | undefined): string => {
    if (mode === Role.ADMIN) {
        return 'Admin';
    }
    if (mode === Role.TEACHER) {
        return 'Giáo viên';
    }
    if (mode === Role.STUDENT) {
        return 'Học sinh';
    }
    if (!mode) {
        return '';
    }
    throw new Error('mode not valid');
};

export const getTextVerify = (mode: Verify | undefined): string => {
    if (mode === Verify.NOT_VERIFY) {
        return 'Chưa xác thực';
    }
    if (mode === Verify.VERIFIED) {
        return 'Đã xác thực';
    }
    if (mode === Verify.BLOCKED) {
        return 'Chặn';
    }
    if (!mode) {
        return '';
    }
    throw new Error('mode not valid');
};
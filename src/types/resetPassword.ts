export interface ResetPasswordRequest {
    password: string; 
    confirmPassword: string;
    forgotPasswordToken: string; 
}

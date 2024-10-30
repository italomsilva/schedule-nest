export interface EmailGateway{
    sendResetPasswordCode(fullName: string, email: string, code):void;
}
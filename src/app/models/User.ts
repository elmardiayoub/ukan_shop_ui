import { AccountStatus } from "../enums/AccountStatus";


export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailVerified: boolean;
    status: AccountStatus;
}

import { IUser, UserRole } from './models/user.interface';

export class User implements IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        name: string,
        email: string,
        password: string,
        role: UserRole,
        _id?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    isTeacher(): boolean {
        return this.role === 'teacher';
    }

    isStudent(): boolean {
        return this.role === 'student';
    }
}

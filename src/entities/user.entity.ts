import { IUser, UserRole } from './models/user.interface';

export class User {
    constructor(private readonly props: IUser) { }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get role(): UserRole {
        return this.props.role;
    }

    isTeacher(): boolean {
        return this.props.role === 'teacher';
    }

    isStudent(): boolean {
        return this.props.role === 'student';
    }
}

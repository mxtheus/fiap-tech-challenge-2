import { IUser } from '@/entities/models/user.interface';

export interface IUserRepository {
    create(data: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
}

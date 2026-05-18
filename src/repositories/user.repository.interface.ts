import { IPaginatedResponse } from '@/entities/models/pagination.interface';
import { IUser, UserRole } from '@/entities/models/user.interface';

export interface IUserRepository {
    create(data: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByIdWithPassword(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(page: number, limit: number, role?: UserRole, isActive?: boolean, search?: string): Promise<IPaginatedResponse<IUser>>;
    update(id: string, data: Partial<IUser>): Promise<void>;
    deactivate(id: string): Promise<void>;
    activate(id: string): Promise<void>;
}

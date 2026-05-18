import { IPaginatedResponse } from '@/entities/models/pagination.interface';
import { IUser, UserRole } from '@/entities/models/user.interface';
import { IUserRepository } from '@/repositories/user.repository.interface';

export class ListUsersUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler(
        page: number,
        limit: number,
        role?: UserRole,
        isActive?: boolean,
        search?: string
    ): Promise<IPaginatedResponse<IUser>> {
        return await this.userRepository.findAll(
            page,
            limit,
            role,
            isActive,
            search
        );
    }
}
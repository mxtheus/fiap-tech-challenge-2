import { IUser } from '@/entities/models/user.interface';
import { IUserRepository } from '@/repositories/user.repository.interface';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UserSelfDemoteError } from './errors/user-self-demote-error';

interface IRequest {
    authenticatedUserId: string;
    targetUserId: string;
    data: Partial<IUser>;
}

export class UpdateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler({
        authenticatedUserId,
        targetUserId,
        data
    }: IRequest): Promise<void> {
        const existingUser = await this.userRepository.findById(targetUserId);

        if (!existingUser) {
            throw new ResourceNotFoundError();
        }

        if (authenticatedUserId === targetUserId && data.role === 'student') {
            throw new UserSelfDemoteError();
        }

        if (data.password) {
            data.password = await hash(data.password, 8);
        }

        await this.userRepository.update(targetUserId, data);
    }
}
import { IUserRepository } from '@/repositories/user.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { UserSelfDemoteError } from './errors/user-self-demote-error';

interface IRequest {
    authenticatedUserId: string;
    targetUserId: string;
}

export class DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler({ authenticatedUserId, targetUserId }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(targetUserId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        if (authenticatedUserId === targetUserId) {
            throw new UserSelfDemoteError();
        }

        await this.userRepository.deactivate(targetUserId);
    }
}
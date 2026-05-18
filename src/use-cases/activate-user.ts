import { IUserRepository } from '@/repositories/user.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IRequest {
    targetUserId: string;
}

export class ActivateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler({ targetUserId }: IRequest): Promise<void> {
        const user = await this.userRepository.findById(targetUserId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        await this.userRepository.activate(targetUserId);
    }
}
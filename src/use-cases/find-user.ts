import { IUser } from '@/entities/models/user.interface';
import { IUserRepository } from '@/repositories/user.repository.interface';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export class FindUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler(id: string): Promise<IUser> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new ResourceNotFoundError();

        return user;
    }
}

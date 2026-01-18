import { IUser } from '@/entities/models/user.interface';
import { IUserRepository } from '@/repositories/user.repository.interface';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/invalid-credentials-error copy';

export class CreateUserUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler(data: IUser): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await hash(data.password, 8);

        return await this.userRepository.create({
            ...data,
            password: passwordHash
        });
    }
}

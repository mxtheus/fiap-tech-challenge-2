import { IUser } from '@/entities/models/user.interface';
import { IUserRepository } from '@/repositories/user.repository.interface';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

export class SigninUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler(email: string): Promise<IUser> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        return user;
    }
}

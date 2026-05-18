import { IUserRepository } from '@/repositories/user.repository.interface';
import { compare, hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface IRequest {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

export class ResetPasswordUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async handler({
        userId,
        currentPassword,
        newPassword
    }: IRequest): Promise<void> {
        const user = await this.userRepository.findByIdWithPassword(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        const passwordMatches = await compare(
            currentPassword,
            user.password
        );

        if (!passwordMatches) {
            throw new InvalidCredentialsError();
        }

        const passwordHash = await hash(newPassword, 8);

        await this.userRepository.update(userId, {
            password: passwordHash
        });
    }
}
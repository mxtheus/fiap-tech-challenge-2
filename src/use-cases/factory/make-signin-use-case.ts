import { MongooseUserRepository } from '@/repositories/mongoose/user.repository';
import { SigninUseCase } from '../signin';

export function makeSigninUseCase() {
    const userRepository = new MongooseUserRepository();

    const signinUseCase = new SigninUseCase(userRepository);

    return signinUseCase;
}
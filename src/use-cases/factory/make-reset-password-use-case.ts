import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { ResetPasswordUseCase } from "../reset-password";

export function makeResetPasswordUseCase() {
    const userRepository = new MongooseUserRepository();

    const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

    return resetPasswordUseCase;
}
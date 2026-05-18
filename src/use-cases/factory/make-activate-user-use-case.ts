import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { ActivateUserUseCase } from "../activate-user";

export function makeActivateUserUseCase() {
    const userRepository = new MongooseUserRepository();

    const activateUserUseCase = new ActivateUserUseCase(userRepository);

    return activateUserUseCase;
}
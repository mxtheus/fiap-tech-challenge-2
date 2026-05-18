import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { UpdateUserUseCase } from "../update-user";

export function makeUpdateUserUseCase() {
    const userRepository = new MongooseUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(userRepository);

    return updateUserUseCase;
}
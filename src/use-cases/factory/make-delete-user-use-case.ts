import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { DeleteUserUseCase } from "../delete-user";

export function makeDeleteUserUseCase() {
    const userRepository = new MongooseUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    return deleteUserUseCase;
}
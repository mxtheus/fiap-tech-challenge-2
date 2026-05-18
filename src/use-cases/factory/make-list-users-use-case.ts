import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { ListUsersUseCase } from "../list-users";

export function makeListUsersUseCase() {
    const userRepository = new MongooseUserRepository();

    const listUsersUseCase = new ListUsersUseCase(userRepository);

    return listUsersUseCase;
}
import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
    const userRepository = new MongooseUserRepository();

    const createUserUseCase = new CreateUserUseCase(userRepository);

    return createUserUseCase;
}

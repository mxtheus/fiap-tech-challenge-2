import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { FindUserUseCase } from "../find-user";

export function makeFindUserUseCase() {
    const userRepository = new MongooseUserRepository();

    const findUserUseCase = new FindUserUseCase(userRepository);

    return findUserUseCase;
}

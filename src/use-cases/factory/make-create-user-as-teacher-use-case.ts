import { MongooseUserRepository } from "@/repositories/mongoose/user.repository";
import { CreateUserAsTeacherUseCase } from "../create-user-as-teacher";

export function makeCreateUserAsTeacherUseCase() {
    const userRepository = new MongooseUserRepository();

    const createUserAsTeacherUseCase = new CreateUserAsTeacherUseCase(userRepository);

    return createUserAsTeacherUseCase;
}
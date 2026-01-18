import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { DeletePostUseCase } from "../delete-post";

export function makeDeletePostUseCase() {
    const postRepository = new MongoosePostRepository();

    const deletePostUseCase = new DeletePostUseCase(postRepository);

    return deletePostUseCase;
}

import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { UpdatePostUseCase } from "../update-post";

export function makeUpdatePostUseCase() {
    const postRepository = new MongoosePostRepository();

    const updatePostUseCase = new UpdatePostUseCase(postRepository);

    return updatePostUseCase;
}

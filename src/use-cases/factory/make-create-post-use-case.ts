import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { CreatePostUseCase } from "../create-post";

export function makeCreatePostUseCase() {
    const postRepository = new MongoosePostRepository();

    const createPostUseCase = new CreatePostUseCase(postRepository);

    return createPostUseCase;
}

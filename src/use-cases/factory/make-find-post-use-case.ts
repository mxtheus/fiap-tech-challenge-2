import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { FindPostUseCase } from "../find-post";

export function makeFindPostUseCase() {
    const postRepository = new MongoosePostRepository();

    const findPostUseCase = new FindPostUseCase(postRepository);

    return findPostUseCase;
}

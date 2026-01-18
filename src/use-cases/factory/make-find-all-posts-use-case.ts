import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { FindAllPostsUseCase } from "../find-all-posts";

export function makeFindAllPostsUseCase() {
    const postRepository = new MongoosePostRepository();

    const findAllPostsUseCase = new FindAllPostsUseCase(postRepository);

    return findAllPostsUseCase;
}

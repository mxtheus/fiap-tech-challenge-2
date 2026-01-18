import { MongoosePostRepository } from "@/repositories/mongoose/post.repository";
import { SearchPostsUseCase } from "../search-posts";

export function makeSearchPostsUseCase() {
    const postRepository = new MongoosePostRepository();

    const findAllPostsUseCase = new SearchPostsUseCase(postRepository);

    return findAllPostsUseCase;
}

import { IPost } from '@/entities/models/post.interface';
import { IPostRepository } from '@/repositories/post.repository.interface';

export class UpdatePostUseCase {
    constructor(private readonly postRepository: IPostRepository) { }

    async handler({
        _id,
        title,
        content,
        authorId
    }: IPost): Promise<void> {
        await this.postRepository.update(_id!, {
            title,
            content,
            authorId
        });
    }
}

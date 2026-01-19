import { makeFindAllPostsUseCase } from '@/use-cases/factory/make-find-all-posts-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const findAllPostsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10)
});

export async function findAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit } = findAllPostsQuerySchema.parse(request.query);

    const findAllPostsUseCase = makeFindAllPostsUseCase();

    const posts = await findAllPostsUseCase.handler(request.user.role, page, limit);

    return reply.status(200).send(posts);
}

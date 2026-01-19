import { makeSearchPostsUseCase } from '@/use-cases/factory/make-search-posts-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const searchPostQuerySchema = z.object({
    keyword: z.string(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10)
});

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit, keyword } = searchPostQuerySchema.parse(request.query);

    const searchPostsUseCase = makeSearchPostsUseCase();

    const posts = await searchPostsUseCase.handler(request.user.role, keyword, page, limit);

    return reply.status(200).send(posts);
}

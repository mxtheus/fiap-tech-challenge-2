import { makeSearchPostsUseCase } from '@/use-cases/factory/make-search-posts-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const registerQuerySchema = z.object({
        keyword: z.string(),
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
    });

    const { page, limit, keyword } = registerQuerySchema.parse(request.query);

    const searchPostsUseCase = makeSearchPostsUseCase();

    const posts = await searchPostsUseCase.handler(keyword, page, limit);

    return reply.status(200).send(posts);
}

import { makeFindPostUseCase } from '@/use-cases/factory/make-find-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findPost(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.coerce.string()
    });

    const { id } = paramsSchema.parse(request.params);

    const findPostUseCase = makeFindPostUseCase();

    const post = await findPostUseCase.handler(id);

    return reply.status(200).send(post);
}

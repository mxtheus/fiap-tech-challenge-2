import { makeFindPostUseCase } from '@/use-cases/factory/make-find-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const findPostParamsSchema = z.object({
    id: z.coerce.string()
});

export async function findPost(request: FastifyRequest, reply: FastifyReply) {
    const { id } = findPostParamsSchema.parse(request.params);

    const findPostUseCase = makeFindPostUseCase();

    const post = await findPostUseCase.handler(request.user.role, id);

    return reply.status(200).send(post);
}

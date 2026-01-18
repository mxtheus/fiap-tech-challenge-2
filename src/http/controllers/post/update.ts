import { makeUpdatePostUseCase } from '@/use-cases/factory/make-update-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        id: z.coerce.string(),
        title: z.string(),
        content: z.string(),
        authorId: z.string()
    });

    const post = bodySchema.parse(request.params);

    const updatePostUseCase = makeUpdatePostUseCase();

    await updatePostUseCase.handler(post);

    return reply.status(204).send();
}

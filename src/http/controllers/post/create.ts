import { makeCreatePostUseCase } from '@/use-cases/factory/make-create-post-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.string().default("0")
    });

    const data = bodySchema.parse(request.body);

    const createPostUseCase = makeCreatePostUseCase();

    const post = await createPostUseCase.handler(data);

    return reply.status(201).send(post);
}

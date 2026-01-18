import { makeFindUserUseCase } from '@/use-cases/factory/make-find-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.coerce.string()
    });

    const { id } = paramsSchema.parse(request.params);

    const findUserUseCase = makeFindUserUseCase();

    const user = await findUserUseCase.handler(id);

    return reply.status(200).send(user);
}

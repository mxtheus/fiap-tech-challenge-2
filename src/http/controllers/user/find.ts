import { makeFindUserUseCase } from '@/use-cases/factory/make-find-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const findUserParamsSchema = z.object({
    id: z.coerce.string()
});

export async function findUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = findUserParamsSchema.parse(request.params);

    const findUserUseCase = makeFindUserUseCase();

    const user = await findUserUseCase.handler(id);

    return reply.status(200).send(user);
}

import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const createUserBodySchema = z.object({
    name: z.string(),
    email: z.email().toLowerCase(),
    password: z.string().min(6)
});

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const data = createUserBodySchema.parse(request.body);

    const createUserUseCase = makeCreateUserUseCase();

    const user = await createUserUseCase.handler({ ...data, role: 'student' });

    return reply.status(201).send({ id: user?._id, email: user?.email });
}

import { makeCreateUserAsTeacherUseCase } from '@/use-cases/factory/make-create-user-as-teacher-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const createUserAsTeacherBodySchema = z.object({
    name: z.string(),
    email: z.email().toLowerCase(),
    password: z.string().min(6),
    role: z.enum(['teacher', 'student'])
});

export async function createUserAsTeacher(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const data = createUserAsTeacherBodySchema.parse(request.body);

    const createUserAsTeacherUseCase = makeCreateUserAsTeacherUseCase();

    const user = await createUserAsTeacherUseCase.handler(data);

    return reply.status(201).send({
        id: user?._id,
        email: user?.email
    });
}
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case';
import { compare } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const userSigninBodySchema = z.object({
  email: z.string().toLowerCase(),
  password: z.string()
});

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = userSigninBodySchema.parse(request.body);

  const signinUseCase = makeSigninUseCase();

  const user = await signinUseCase.handler(email);

  const isPasswordMatch = await compare(password, user.password);

  if (!isPasswordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = await reply.jwtSign({ id: user._id, email, role: user.role });

  return reply.status(200).send({ token });
}

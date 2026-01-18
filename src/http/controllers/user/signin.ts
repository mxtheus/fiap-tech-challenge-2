import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeSigninUseCase } from '@/use-cases/factory/make-signin-use-case';
import { compare } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().toLowerCase(),
    password: z.string()
  });

  const { email, password } = registerBodySchema.parse(request.body);

  const signinUseCase = makeSigninUseCase();

  const user = await signinUseCase.handler(email);

  const isPasswordMatch = await compare(password, user.password);

  if (!isPasswordMatch) {
    throw new InvalidCredentialsError();
  }

  const token = await reply.jwtSign({ email });

  return reply.status(200).send({ token });
}

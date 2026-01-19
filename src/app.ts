import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import 'reflect-metadata';
import { env } from './env';
import { postsRoutes } from './http/controllers/post/routes';
import { userRoutes } from './http/controllers/user/routes';
import { validateJwt } from './http/middlewares/jwt-validate';
import swaggerPlugin from './http/swagger';
import { globalErrorHandler } from './utils/global-error-handler';

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '1h' }
});

app.register(swaggerPlugin);

app.addHook('onRequest', validateJwt);

app.register(postsRoutes);
app.register(userRoutes);

app.setErrorHandler(globalErrorHandler);
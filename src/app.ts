import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';
import 'reflect-metadata';
import { env } from './env';
import { postsRoutes } from './http/controllers/post/routes';
import { userRoutes } from './http/controllers/user/routes';
import { validateJwt } from './http/middlewares/jwt-validate';
import { globalErrorHandler } from './utils/global-error-handler';

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '1h' }
});

app.addHook('onRequest', validateJwt);

app.register(postsRoutes);
app.register(userRoutes);

app.setErrorHandler(globalErrorHandler);
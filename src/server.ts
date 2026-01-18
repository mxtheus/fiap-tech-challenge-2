import '@/lib/mongoose/db';
import { app } from './app';
import { env } from './env';

async function bootstrap() {
    app
        .listen({
            host: '0.0.0.0',
            port: env.PORT
        })
        .then(() => {
            console.log(`Server running in port ${env.PORT}.`);
        });
}

bootstrap();
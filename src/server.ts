import '@/lib/mongoose/db';

import { app } from './app';

import { createDefaultUser } from './bootstrap/create-default-user';
import { migrateUsersIsActive } from './bootstrap/migrate-users-is-active';

import { env } from './env';

async function bootstrap() {
    await migrateUsersIsActive();

    await createDefaultUser();

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
import { app } from '@/app';
import mongoose from 'mongoose';
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    await app.ready();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
});

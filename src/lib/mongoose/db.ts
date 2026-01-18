import { env } from '@/env';
import mongoose, { Connection } from 'mongoose';

class Database {
    private isConnected = false;

    constructor() {
        this.connection();
    }

    private async connection(): Promise<void> {
        if (this.isConnected) return;

        try {
            await mongoose.connect(env.MONGO_URI);

            this.isConnected = true;
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw new Error(`Error connecting to MongoDB: ${error}`);
        }
    }

    get connectionInstance(): Connection {
        return mongoose.connection;
    }
}

export const database = new Database();
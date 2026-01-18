import { IUser } from '@/entities/models/user.interface';
import { model, Model, Schema } from 'mongoose';

export type UserDocument = IUser;

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['teacher', 'student'],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

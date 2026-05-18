import { UserModel } from '@/repositories/mongoose/schemas/user.schema';
import { hash } from 'bcryptjs';

export async function createDefaultUser() {
    const existing = await UserModel.findOne({
        email: process.env.DEFAULT_TEACHER_EMAIL
    });

    if (existing) return;

    const passwordHash = await hash(
        process.env.DEFAULT_TEACHER_PASSWORD!,
        8
    );

    await UserModel.create({
        name: process.env.DEFAULT_TEACHER_NAME,
        email: process.env.DEFAULT_TEACHER_EMAIL,
        password: passwordHash,
        role: 'teacher',
        isActive: true
    });
}
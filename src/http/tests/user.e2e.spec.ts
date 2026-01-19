import { app } from '@/app';
import { describe, expect, it } from 'vitest';

async function createUser(role: 'student' | 'teacher') {
    await app.inject({
        method: 'POST',
        url: '/user',
        payload: {
            name: role,
            email: `${role}@test.com`,
            password: '123456',
            role
        }
    });

    const signin = await app.inject({
        method: 'POST',
        url: '/user/signin',
        payload: {
            email: `${role}@test.com`,
            password: '123456'
        }
    });

    const { token } = signin.json();
    return token;
}

describe('User auth', () => {
    it('should authenticate student and teacher', async () => {
        const studentToken = await createUser('student');
        const teacherToken = await createUser('teacher');

        expect(studentToken).toBeDefined();
        expect(teacherToken).toBeDefined();
    });
});

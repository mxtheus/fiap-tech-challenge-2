import { app } from '@/app';
import { describe, expect, it } from 'vitest';

async function auth(role: 'student' | 'teacher') {
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

    const res = await app.inject({
        method: 'POST',
        url: '/user/signin',
        payload: {
            email: `${role}@test.com`,
            password: '123456'
        }
    });

    return res.json().token;
}

describe('Posts HTTP', () => {
    it('teacher can create and student cannot', async () => {
        const teacherToken = await auth('teacher');
        const studentToken = await auth('student');

        // teacher creates post
        const post = await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Post Title', content: 'Content', isDraft: false }
        });

        expect(post.statusCode).toBe(201);
        const postId = post.json()._id;

        // student tries to create post
        const studentPost = await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${studentToken}` },
            payload: { title: 'Student Post', content: 'Content', isDraft: false }
        });

        expect(studentPost.statusCode).toBe(403);
    });

    it('teacher can see drafts, student cannot', async () => {
        const teacherToken = await auth('teacher');
        const studentToken = await auth('student');

        const draft = await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Draft Post', content: 'Draft content', isDraft: true }
        });

        const postId = draft.json()._id;

        // teacher sees draft
        const teacherView = await app.inject({
            method: 'GET',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${teacherToken}` }
        });
        expect(teacherView.statusCode).toBe(200);

        // student does not see draft
        const studentView = await app.inject({
            method: 'GET',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${studentToken}` }
        });
        expect(studentView.statusCode).toBe(404);
    });

    it('findAll and search respect isDraft filter', async () => {
        const teacherToken = await auth('teacher');
        const studentToken = await auth('student');

        // create multiple posts
        await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Visible Post', content: 'Content', isDraft: false }
        });
        await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Draft Post', content: 'Content', isDraft: true }
        });

        // student sees only non-draft in findAll
        const studentPosts = await app.inject({
            method: 'GET',
            url: '/posts',
            headers: { authorization: `Bearer ${studentToken}` }
        });
        expect(studentPosts.statusCode).toBe(200);
        studentPosts.json().forEach((p: any) => {
            expect(p.isDraft).toBe(false);
        });

        // student search only returns non-draft
        const search = await app.inject({
            method: 'GET',
            url: '/posts/search?keyword=Post',
            headers: { authorization: `Bearer ${studentToken}` }
        });
        search.json().forEach((p: any) => {
            expect(p.isDraft).toBe(false);
        });
    });

    it('teacher can update and delete posts, student cannot', async () => {
        const teacherToken = await auth('teacher');
        const studentToken = await auth('student');

        const post = await app.inject({
            method: 'POST',
            url: '/posts',
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Update/Delete', content: 'Content', isDraft: false }
        });

        const postId = post.json()._id;

        // teacher updates
        const updated = await app.inject({
            method: 'PUT',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${teacherToken}` },
            payload: { title: 'Updated', content: 'Updated', isDraft: true }
        });
        expect(updated.statusCode).toBe(204);

        // teacher deletes
        const deleted = await app.inject({
            method: 'DELETE',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${teacherToken}` }
        });
        expect(deleted.statusCode).toBe(204);

        // student cannot update/delete
        const studentUpdate = await app.inject({
            method: 'PUT',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${studentToken}` },
            payload: { title: 'Hack', content: 'Hacked', isDraft: false }
        });
        expect(studentUpdate.statusCode).toBe(403);

        const studentDelete = await app.inject({
            method: 'DELETE',
            url: `/posts/${postId}`,
            headers: { authorization: `Bearer ${studentToken}` }
        });
        expect(studentDelete.statusCode).toBe(403);
    });
});

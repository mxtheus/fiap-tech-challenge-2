export interface IPost {
    _id?: string;
    title: string;
    content: string;
    authorId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
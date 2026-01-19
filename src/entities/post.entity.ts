import { IPost, IPostAuthor } from './models/post.interface';

export class Post implements IPost {
    _id?: string;
    title: string;
    content: string;
    isDraft: boolean;
    author?: string | IPostAuthor;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        title: string,
        content: string,
        isDraft: boolean,
        _id?: string,
        author?: string | IPostAuthor,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.title = title;
        this.content = content;
        this.isDraft = isDraft;
        this._id = _id;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

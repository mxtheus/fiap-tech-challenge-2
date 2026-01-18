export interface IPost {
    _id?: string;
    title: string;
    content: string;
    isDraft: boolean;
    author?: string | IPostAuthor;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IPostAuthor {
    _id?: string;
    name: string;
}

export interface IPostsFilters {
    isDraft?: boolean;
}
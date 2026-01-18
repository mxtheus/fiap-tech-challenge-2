import { IPost } from './models/post.interface';

export class Post {
    constructor(private props: IPost) { }

    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get author() {
        return this.props.author;
    }
}

import { IFlickrItem } from "./flickr-interfaces";

export class FlickrItem {
    author: string;
    authorId: string;
    dateTaken: Date;
    description: string;
    link: string;
    mediaLink: string;
    published: Date;
    tags: string[];
    title: string;

    constructor(item: IFlickrItem) {
        this.author = this.getAuthorName(item.author);
        this.authorId = item.author_id;
        this.dateTaken = new Date(item.date_taken);
        this.description = item.description;
        this.link = item.link;
        this.mediaLink = item.media.m;
        this.published = new Date(item.published);
        this.tags = item.tags.split(" ");
        this.title = item.title;
    }

    private getAuthorName(author: string) {
        const matches = author.match(/\("(.*)"\)/);
        return matches && matches.length > 1 ?
            matches[1] :
            author;
    }
}

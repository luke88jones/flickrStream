export interface IFlickrResponse {
    description: string;
    items: any[];
    link: string;
    modified: string;
    title: string;
}

export interface IFlickrItem {
    author: string;
    author_id: string;
    date_taken: string;
    description: string;
    link: string;
    media: IMediaObj;
    published: string;
    tags: string;
    title: string;
}

interface IMediaObj {
    m: string;
}

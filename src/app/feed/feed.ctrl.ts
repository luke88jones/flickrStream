import { FlickrItem, IFlickrResponse } from "../models";
import { FeedService } from "../services";

export class FeedCtrl implements ng.IComponentController {
    static $inject = [
        "feedService"
    ];

    loading: boolean;
    photos: FlickrItem[];
    searchTags: string;

    constructor(
        private feedService: FeedService
    ) { }

    $onInit() {
        this.loading = true;
        this.feedService.get()
            .then((res: IFlickrResponse) => this.responseHandler(res));
    }

    search() {
        this.loading = true;
        this.feedService.getByTag(this.searchTags.split(" "))
            .then((res: IFlickrResponse) => this.responseHandler(res));
    }

    private responseHandler(res: IFlickrResponse) {
        this.photos = res.items;
        this.loading = false;
    }
}

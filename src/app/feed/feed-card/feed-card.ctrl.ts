import { FlickrItem } from "../../models";

export class FeedCardCtrl implements ng.IComponentController {
    photo: FlickrItem;
    hasTags: boolean;

    $onInit() {
        // Joining as a lot of images have a single empty tag
        this.hasTags = this.photo.tags.join().length > 0;
    }
}

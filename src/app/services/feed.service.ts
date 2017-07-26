import * as angular from "angular";
import { FlickrItem, IFlickrResponse } from "../models";

export class FeedService {
    static $inject = [
        "$http",
        "$sce"
    ];

    defaultParams: { jsoncallback: string; format: string; tags?: string };
    private readonly url: string;

    constructor(
        private $http: angular.IHttpService,
        $sce: angular.ISCEService
    ) {
        this.url = "https://api.flickr.com/services/feeds/photos_public.gne";
        this.defaultParams = {
                    jsoncallback: "JSON_CALLBACK",
                    format: "json"
                };
    }

    get() {
        return this.makeRequest();
    }

    getByTag(tags: string[]) {
        return this.makeRequest({ tags: tags.join(",") });
    }

    private makeRequest(params: {} = {}) {
        const requestParams = angular.merge({}, this.defaultParams, params);
        return this.$http.jsonp(
            this.url,
            {
                params: requestParams,
                transformResponse: data => this.transformResponse(data)
            })
            .then((res: ng.IHttpPromiseCallbackArg<IFlickrResponse>) => res.data);
    }

    private transformResponse(json: IFlickrResponse) {
        if (json && json.items.length > 0) {
            json.items = json.items.map(i => new FlickrItem(i));
        }
        return json;
    }
}

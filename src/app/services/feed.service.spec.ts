import { FlickrItem, IFlickrResponse } from "../models";
import { FeedService } from "./feed.service";

describe("feedService", () => {
    let service: FeedService;
    let $q: angular.IQService;
    let result: FlickrItem[];
    let $timeout: angular.ITimeoutService;

    const $httpMock = jasmine.createSpyObj("$http", ["jsonp"]);
    $httpMock.jsonp.and.callFake(() => {
        return $q.when({ data: { items: [{ title: "test" }] } });
    });

    // tslint:disable-next-line:variable-name
    beforeEach(inject((_$q_, _$timeout_) => {
        $q = _$q_;
        $timeout = _$timeout_;

        result = [];
        service = new FeedService($httpMock);
        $httpMock.jsonp.calls.reset();
    }));

    describe("When calling get", () => {
        beforeEach(() => {
            service.get()
                .then((res: IFlickrResponse) => { result = res.items; });
            $timeout.flush();
        });

        it("should call the jsonp method", () => {
            expect($httpMock.jsonp).toHaveBeenCalled();
        });

        it("should pass the url and default params", () => {
            expect($httpMock.jsonp).toHaveBeenCalledWith("https://api.flickr.com/services/feeds/photos_public.gne", {
                params: {
                    jsoncallback: "JSON_CALLBACK",
                    format: "json"
                },
                transformResponse: jasmine.any(Function)
            });
        });

        it("should return the result", () => {
            expect(result[0].title).toEqual("test");
        });
    });

    describe("When calling getByTag", () => {
        beforeEach(() => {
            service.getByTag(["big", "dog"])
                .then((res: IFlickrResponse) => { result = res.items; });
            $timeout.flush();
        });

        it("should call the jsonp method", () => {
            expect($httpMock.jsonp).toHaveBeenCalled();
        });

        it("should pass the url and default params", () => {
            expect($httpMock.jsonp).toHaveBeenCalledWith("https://api.flickr.com/services/feeds/photos_public.gne", {
                params: {
                    jsoncallback: "JSON_CALLBACK",
                    format: "json",
                    tags: "big,dog"
                },
                transformResponse: jasmine.any(Function)
            });
        });

        it("should return the result", () => {
            expect(result[0].title).toEqual("test");
        });
    });
});

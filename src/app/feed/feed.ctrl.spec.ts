import * as angular from "angular";
import { FlickrItem } from "../models";
import { FeedCtrl } from "./feed.ctrl";

describe("feedCtrl", () => {
    let $componentController: angular.IComponentControllerService;
    let $q: angular.IQService;
    let $timeout: angular.ITimeoutService;
    let ctrl: FeedCtrl;

    const feedServiceMock = jasmine.createSpyObj("feedService", ["get", "getByTag"]);
    feedServiceMock.get.and.callFake(() => $q.when({ items: [ { title: "123" }] }));
    feedServiceMock.getByTag.and.callFake(() => $q.when({ items: [ { title: "456" }] }));

    beforeEach(angular.mock.module("flickrStream"));

    // tslint:disable-next-line:variable-name
    beforeEach(inject((_$componentController_, _$q_, _$timeout_) => {
        $componentController = _$componentController_;
        $q = _$q_;
        $timeout = _$timeout_;
        ctrl = <FeedCtrl>$componentController("feed", { feedService: feedServiceMock });
    }));

    describe("When initialised", () => {
        beforeEach(() => {
            ctrl.$onInit();
        });

        it("Should initialise the searchTags property", () => {
            expect(ctrl.searchTags).toEqual("");
        });

        it("Should set loading to true", () => {
            expect(ctrl.loading).toEqual(true);
        });

        it("Should get the initial set of image information", () => {
            expect(feedServiceMock.get).toHaveBeenCalled();
        });

        it("Should initialise the photo array", () => {
            expect(ctrl.photos).toEqual([]);
        });

        describe("When the flickr api call returns", () => {
            beforeEach(() => {
                $timeout.flush();
            });

            it("Should set the photos property", () => {
                expect(ctrl.photos).toEqual(<FlickrItem[]>[ { title: "123" } ]);
            });

            it("Should set the loading property to false", () => {
                expect(ctrl.loading).toEqual(false);
            });
        });
    });

    describe("When calling search without a search term", () => {
        beforeEach(() => {
            ctrl.searchTags = "";
            ctrl.search();
        });

        it("Should not call the flickr API", () => {
            expect(feedServiceMock.getByTag).not.toHaveBeenCalled();
        });
    });

    describe("When calling search with a single search term", () => {
        beforeEach(() => {
            ctrl.searchTags = "dog";
            ctrl.search();
        });

        it("Should call the flickr API", () => {
            expect(feedServiceMock.getByTag).toHaveBeenCalledWith(["dog"]);
        });
    });

    describe("When calling search with multiple search terms", () => {
        beforeEach(() => {
            ctrl.searchTags = "big dogs";
            ctrl.search();
        });

        it("Should call the flickr API", () => {
            expect(feedServiceMock.getByTag).toHaveBeenCalledWith(["big", "dogs"]);
        });

        describe("When the flickr api call returns", () => {
            beforeEach(() => {
                $timeout.flush();
            });

            it("Should set the photos property", () => {
                expect(ctrl.photos).toEqual(<FlickrItem[]>[ { title: "456" } ]);
            });

            it("Should set the loading property to false", () => {
                expect(ctrl.loading).toEqual(false);
            });
        });
    });
});

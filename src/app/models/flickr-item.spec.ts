import { FlickrItem } from "./flickr-item";

describe("FlickrItem", () => {
    describe("When creating a new instance", () => {
        let flickrItem;
        beforeEach(() => {
            flickrItem = new FlickrItem({
                author: "nobody@flickr.com (\"Joe Bloggs\")",
                author_id: "1234",
                date_taken: "2017/01/01",
                description: "A picture",
                link: "http://test.com",
                media: { m: "http://test.com/picture/1.png" },
                published: "2017/01/01",
                tags: "test test test",
                title: "A picture",
            });
        });

        it("should map the properties correctly", () => {
            expect(flickrItem.author).toEqual("Joe Bloggs");
            expect(flickrItem.authorId).toEqual("1234");
            expect(flickrItem.dateTaken).toEqual(new Date("2017/01/01"));
            expect(flickrItem.description).toEqual("A picture");
            expect(flickrItem.link).toEqual("http://test.com");
            expect(flickrItem.mediaLink).toEqual("http://test.com/picture/1.png");
            expect(flickrItem.published).toEqual(new Date("2017/01/01"));
            expect(flickrItem.tags).toEqual(["test", "test", "test"]);
            expect(flickrItem.title).toEqual("A picture");
        });
    });
});

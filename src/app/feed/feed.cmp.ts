import "./feed.scss";

export class FeedComponent implements ng.IComponentOptions {
    controller = "feedCtrl";
    template = <string>require("./feed.html");
}

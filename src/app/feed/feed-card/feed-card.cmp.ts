import "./feed-card.scss";

export class FeedCardComponent implements ng.IComponentOptions {
    template = <string>require("./feed-card.html");
    controller = "feedCardCtrl";
    bindings = {
        photo: "<"
    };
}

import * as angular from "angular";

import * as app from "./app";

import "./sass/_flickr-stream.scss";

angular
    .module("flickrStream", [])
    .controller("appMainCtrl", app.AppMainCtrl)
    .controller("feedCardCtrl", app.FeedCardCtrl)
    .controller("feedCtrl", app.FeedCtrl)
    .component("appMain", new app.AppMainComponent())
    .component("feed", new app.FeedComponent())
    .component("feedCard", new app.FeedCardComponent())
    .service("feedService", app.FeedService);

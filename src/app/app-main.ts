import "./app-main.scss";

export class AppMainComponent implements angular.IComponentOptions {
    controller = "appMainCtrl";
    template = <string>require("./app-main.html");
}

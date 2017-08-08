webpackJsonp([0],[,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(3);n(22),r.module("flickrStream",[]).controller("appMainCtrl",o.AppMainCtrl).controller("feedCardCtrl",o.FeedCardCtrl).controller("feedCtrl",o.FeedCtrl).component("appMain",new o.AppMainComponent).component("feed",new o.FeedComponent).component("feedCard",new o.FeedCardComponent).service("feedService",o.FeedService)},,function(t,e,n){"use strict";function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(4)),r(n(14)),r(n(18)),r(n(21))},function(t,e,n){"use strict";function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(5)),r(n(10)),r(n(13))},function(t,e,n){"use strict";function r(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}Object.defineProperty(e,"__esModule",{value:!0}),r(n(6)),r(n(9))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(7);var r=function(){function t(){this.template=n(8),this.controller="feedCardCtrl",this.bindings={photo:"<"}}return t}();e.FeedCardComponent=r},function(t,e){},function(t,e){t.exports='<div class="panel">\n    <div \n        class="panel-body" \n        data-ng-style="{ \'background-image\': \'url({{$ctrl.photo.mediaLink}})\' }"\n        role="img"\n        aria-label="{{$ctrl.photo.title}}">\n        <div class="info-background"></div>\n        <div class="what-by">\n            <a \n                class="title" \n                href="{{$ctrl.photo.link}}"\n                target="_blank" \n                title="{{$ctrl.photo.title}}">\n                {{$ctrl.photo.title}}\n            </a> \n            <span>by</span>\n            <a \n                class="author" \n                href="https://www.flickr.com/photos/{{$ctrl.photo.authorId}}" \n                target="_blank">\n                {{$ctrl.photo.author}}\n            </a>\n        </div>  \n         <div class="tags-container">\n            <ul>\n                <li \n                    data-ng-if="$ctrl.hasTags"\n                    data-ng-repeat="tag in $ctrl.photo.tags">\n                    <span>{{tag}}</span>\n                </li>\n            </ul>\n        </div> \n    </div>\n</div>'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.$onInit=function(){this.hasTags=this.photo.tags.join().length>0},t}();e.FeedCardCtrl=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(11);var r=function(){function t(){this.controller="feedCtrl",this.template=n(12)}return t}();e.FeedComponent=r},function(t,e){},function(t,e){t.exports='<div class="search">\n     <form autocomplete="off" novalidate> \n        <div class="form-group">\n            <div class="input-group">\n                <input type="text" id="tagInput" class="form-control" data-ng-model="$ctrl.searchTags">\n                <span>\n                    <button class="btn btn-primary" data-ng-click="$ctrl.search()">Search</button>\n                </span>\n            </div>\n        </div>\n     </form> \n</div>\n<div class="loader" data-ng-show="$ctrl.loading"></div>\n<div class="results" data-ng-if="!$ctrl.loading">\n    \x3c!-- <div data-ng-if="!$ctrl.loading" data-ng-repeat="photo in $ctrl.photos"> --\x3e\n    <feed-card data-ng-repeat="photo in $ctrl.photos" photo="photo"></feed-card> \n</div> \n'},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.feedService=t}return t.prototype.$onInit=function(){var t=this;this.searchTags="",this.loading=!0,this.photos=[],this.feedService.get().then(function(e){return t.responseHandler(e)})},t.prototype.search=function(){var t=this;this.searchTags.length>0&&(this.loading=!0,this.feedService.getByTag(this.searchTags.split(" ")).then(function(e){return t.responseHandler(e)}))},t.prototype.responseHandler=function(t){this.photos=t.items,this.loading=!1},t.$inject=["feedService"],t}();e.FeedCtrl=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}(n(15))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(16),i=function(){function t(t){this.$http=t,this.url="https://api.flickr.com/services/feeds/photos_public.gne",this.defaultParams={jsoncallback:"JSON_CALLBACK",format:"json"}}return t.prototype.get=function(){return this.makeRequest()},t.prototype.getByTag=function(t){return this.makeRequest({tags:t.join(",")})},t.prototype.makeRequest=function(t){var e=this;void 0===t&&(t={});var n=r.merge({},this.defaultParams,t);return this.$http.jsonp(this.url,{params:n,transformResponse:function(t){return e.transformResponse(t)}}).then(function(t){return t.data})},t.prototype.transformResponse=function(t){return t&&t.items.length>0&&(t.items=t.items.map(function(t){return new o.FlickrItem(t)})),t},t.$inject=["$http"],t}();e.FeedService=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){for(var n in t)e.hasOwnProperty(n)||(e[n]=t[n])}(n(17))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.author=this.getAuthorName(t.author),this.authorId=t.author_id,this.dateTaken=new Date(t.date_taken),this.description=t.description,this.link=t.link,this.mediaLink=t.media.m,this.published=new Date(t.published),this.tags=t.tags.split(" "),this.title=t.title}return t.prototype.getAuthorName=function(t){var e=t.match(/\("(.*)"\)/);return e&&e.length>1?e[1]:t},t}();e.FlickrItem=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),n(19);var r=function(){function t(){this.controller="appMainCtrl",this.template=n(20)}return t}();e.AppMainComponent=r},function(t,e){},function(t,e){t.exports='<nav class="navbar">\n    <div class="navbar-header">\n        <h1 class="navbar-brand">flickr stream</h1>\n    </div>\n</nav>\n <feed></feed> '},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t}();e.AppMainCtrl=r},function(t,e){}],[1]);
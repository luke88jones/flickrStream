// tslint:disable:interface-name
// tslint:disable:no-namespace

import "angular-mocks";

requireAll((<any>require).context("./", true, /spec.ts$/));
function requireAll(r: any): any {
    r.keys().forEach(r);
}

import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../shared/config/env.config';

@Injectable()
export class SecurityService {
    // public API_URL: string = Config.API;
    public API_URL: string = 'http://30.135.210.43:9080/olsadminconsole/individual/admin/';
    public requestUrl: string = this.API_URL+'security/searchUsers';
    public usernameUrl: string = this.API_URL+'security/getUserName';
    public resetPasswordUrl: string = this.API_URL+'security/resetPassword';

    constructor (private http:Http) {}

    /**
     * Get user search result
     *
     * @param userObject
     */
    public getUserList(userObject: Object): Observable<Response> {
        let data = JSON.stringify(userObject);
        console.log(data);
        return this.http.post(this.requestUrl, data, null)
                        .map(res => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Get username service call
     *
     * @param userObject
     */
    public getUserName(userObject: Object): Observable<Response> {
        let data = JSON.stringify(userObject);
        return this.http.post(this.usernameUrl, data, null)
                        .map(res => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    /**
     * Get temp password
     *
     * @param webGuid
     */
    public resetPasswordService(userObject: Object): Observable<Response> {
        let data = JSON.stringify(userObject);
        return this.http.post(this.resetPasswordUrl, data, null)
                        .map(res => res.json())
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}

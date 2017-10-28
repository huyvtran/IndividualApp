import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../shared/config/env.config';

@Injectable()
export class IndividualService {
    public API_URL: string = Config.API;
    public individualSearchUrl: string = this.API_URL + 'admin/individual/searchIndividualReports';
    public cancelAppUrl: string = this.API_URL + 'admin/individual/cancelApp';
    public requestPdfUrl: string = this.API_URL + 'reports/getPdf';
    public requestUrlJSON = './app/individual/api/reportAdvanceSearch.json';
    public updateReleaseToWemAppUrl: string = this.API_URL + 'admin/individual/updateRelease';

    constructor(private http: Http) {
        this.individualSearchUrl = 'http://30.135.210.43:9080/olsadminconsole/individual/admin/individual/searchIndividualReports';
        this.cancelAppUrl = 'http://30.135.210.43:9080/olsadminconsole/individual/admin/individual/cancelApp';
        this.updateReleaseToWemAppUrl = 'http://30.135.210.43:9080/olsadminconsole/individual/admin/individual/updateRelease';
     }

    /**
     * Search searvice call
     *
     * @param searchCriteria
     */
    public searchIndividualService(searchCriteria: Object): Observable<Response> {
        let data = JSON.stringify(searchCriteria);
        // return this.searchReportJSON();
        return this.http.post(this.individualSearchUrl, data, null)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
        /**
     * Search searvice call
     *
     * @param acn
     */
    public cancelApplicationService(acn: string): Observable<Response> {
        let data = JSON.stringify({ 'acn' : acn });
        // return this.searchReportJSON();
        return this.http.post(this.cancelAppUrl, data, null)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
     /**
     * Search searvice call
     *
     * @param inputArray
     */
    public updateReleaseToWemService(inputArray: any): Observable<Response> {
        // let data = JSON.stringify({ 'acn' : acn });
        // return this.searchReportJSON();
        return this.http.post(this.updateReleaseToWemAppUrl, inputArray, null)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    /**
     * Get result from JSON
     */
    public searchReportJSON(): Observable<Response> {
        return this.http.get(this.requestUrlJSON)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getReportPdf(acn:string): Observable<Response> {
        let acnObj = JSON.stringify({'acn':acn});
        return this.http.post(this.requestPdfUrl, acnObj, null)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

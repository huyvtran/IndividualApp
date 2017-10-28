import { Config } from '../shared/config/env.config';

import { Http, Headers, Response, Jsonp, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdministrationService {
    public API_URL: string = Config.API;
    // public requestRiskAdjustmentUrl: string = this.API_URL + 'admin/risk/getRisk';
    public requestRiskAdjustmentUrl: string = './app/administration/api/riskAdjustmentReport.json';

    /**
     *
     * @param http
     */
    constructor(private http: Http) { }

    /**
     * Search searvice call
     *
     * @param searchCriteriaObject
     */
    public enrollmentRiskAdjustmentReportService(searchCriteriaObject: Object): Observable<Response> {
        let data = JSON.stringify(searchCriteriaObject);
        console.log(data);
        return this.http.post(this.requestRiskAdjustmentUrl, data, null)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    /**
     * Simulating enrollmentSearchReportService
     */
    public getReportFromJson(): Observable<Response> {
        return this.http.get(this.requestRiskAdjustmentUrl).map(res => res.json());
    }
}

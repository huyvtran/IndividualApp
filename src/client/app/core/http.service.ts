import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptions, RequestOptionsArgs,
        Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

declare var $: any;

@Injectable()
export class HttpService extends Http {
    public pendingRequests: number = 0;
    public showLoading: boolean = false;

    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('##############################################1');
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('##############################################2');
        return this.intercept(super.get(url,options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options === null) {
            options = new RequestOptions();
        }
        if (options.headers === null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            //options.headers.append('SM_USER', localStorage.getItem('userID'));
            //options.headers.append('Authorization', localStorage.getItem('userToken'));
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        console.log('In the intercept routine..');
        this.turnOnModal();
        this.pendingRequests++;
        return observable
        .catch((err, source) => {
            console.log('Caught error: ' + err);
            if (err.status  === 401) {  // && !_.endsWith(err.url, 'api/auth/login')
                this._router.navigate(['/login']);
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        })
        .do((res: Response) => {
            console.log('Response: ' + res);
        }, (err: any) => {
            this.turnOffModal();
            console.log('Caught error: ' + err);
        })
        .finally(() => {
            console.log('Finally.. delaying, though.');
            var timer = Observable.timer(100);
            timer.subscribe(t => {
            this.turnOffModal();
            });
        });
    }

    private turnOnModal() {
    if (!this.showLoading) {
        this.showLoading = true;
        $('body').spin('modal', '#FFFFFF', 'rgba(51, 51, 51, 0.1)');
        console.log('Turned on modal');
    }
    this.showLoading = true;
    }

  private turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        $('body').spin('modal', '#FFFFFF', 'rgba(51, 51, 51, 0.1)');
      }
      this.showLoading = false;
    }
    console.log('Turned off modal');
  }

}

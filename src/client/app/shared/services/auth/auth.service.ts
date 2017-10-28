import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Config } from './../../config/env.config';

@Injectable()
export class AuthService {

    public API_URL: string = Config.API;

    private token: string;
    private token_expiry: number;
    private appId: string;

    private userId: number;

    private user: Object;

    private loginCredUrl: string = this.API_URL + 'roles/loginSM';
    //'http://va10dlvwbs309.wellpoint.com:9080/solsadmin/senior/admin/roles/loginSM';
    //'https://ols.dev1.internal3.eportal.anthem.com/solsadmin/senior/admin/roles/loginSM';

    private permissions: Object = {};

    constructor(private http: Http,
        private router: Router) {

    }

    public getHeaders(env: string) {
        //if (env !== 'SBX' && env !== 'DEVELOP') {
            // console.log('call if siteminder headers are available');
        //} else {
            let headers = new Headers();
            // headers.append('SM_USER', localStorage.getItem('userID'));
            let options = new RequestOptions({ headers: headers });
            return this.http.get(this.loginCredUrl, options)
                .map(res => {
                    // var token = res.headers.get('Authorization');
                    // localStorage.setItem('userToken', token);
                    return res;
                })
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        //}
    }

    public logout() {
        localStorage.removeItem('userID');
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        this.userId = 0;
        this.router.navigate(['/login']);
    }

    public login(email: string, password: string) {
        return true;
    }

    public save(data: any) {
        localStorage.setItem('userToken', data.token);

        this.token = data.token;
        this.token_expiry = data.expiry;
        this.userId = data.user.user_id;
        localStorage.setItem('user', JSON.stringify(data.user));
        // save permission info
        localStorage.setItem('permissions', JSON.stringify(data.user.permissions));
        // Now load it
        this.loadData();

        var returnUrl = localStorage.getItem('return');

        if (!returnUrl) {
            returnUrl = '';
        }

        this.router.navigate([returnUrl]);
    }


    // Check to make sure the token is valid
    public checkToken() {
        //if it not valid then we get a token
        if (!this.token) {

            //check if localstorage has it setItem
            var token: string = localStorage.getItem('token');
            if (token) {
                //check it hasn't expired
                this.token = token;

                // Get user data
                let userData = localStorage.getItem('user');

                this.loadData();
                return true;

            } else {
                this.router.navigate(['login']);
                return false;
            }
        }

        //if valid then return true
        return true;
    }

    public loggedIn() {
        if (this.userId > 1) {
            return true;
        }

        return false;
    }

    loadData() {
        this.permissions = JSON.parse(localStorage.getItem('permissions'));
        this.user = JSON.parse(localStorage.getItem('user'));
        return true;

        // Old redundent

        /*let roles = userData['roles'];
        for(let item in roles){
            let decode_permission = JSON.parse(roles[item]['group_permission']);
            this.permissions = this.mergePermissions(this.permissions,decode_permission)
        }*/
    }


    public hasPermission(path: any) {
        path = path.split('/');
        let permissions: any = this.permissions;
        for (let index in path) {
            permissions = permissions[path[index]];
            if (permissions === true) {
                return true;
            } else if (!permissions) {
                return false;
            }

            return true;
        }
        return false;
    }
    public getData(name: String) {
        if (!this.user) {
            return false;
        }
        return this.user;
    }
    private mergePermissions(current: any, newValues: any) {
        for (let index in newValues) {
            if (typeof newValues[index] === 'object') {

                if (!current[index]) {
                    current[index] = {};
                }

                current[index] = this.mergePermissions(current[index], newValues[index]);
            } else {
                current[index] = newValues[index];
            }
        }

        return current;
    }
}

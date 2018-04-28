import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { User } from './account';

@Injectable()
export class AuthService {

    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http: HttpClient) {}

    login(account: string, password: string): Observable<any> {
        const url = this.API_URL + 'login';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.post(url, {"account": account, "password": password}, {'headers': headers}).map((d:any) => {
            if(d && d.data){
                localStorage.setItem('token-'+self.APP, d.token);
                return new User(d.data);
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getStorage(key:string){
        return localStorage.getItem(key + '-' + this.APP);
    }

    rmStorage(key:string): void {
        localStorage.removeItem(key + '-' + this.APP);
    }
    
    checkToken(token: string): Observable<any> {
        const url = this.API_URL + 'token';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, {"token": token}, {'headers': headers}).map((res:any) => {
            if(res.data){
                return res.data;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }
}

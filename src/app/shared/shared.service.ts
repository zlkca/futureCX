import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class SharedService {
    subject:Subject<any>;
    private API_URL = environment.API_URL;
    private APP = environment.APP;

    constructor(private http: HttpClient) { this.subject = new Subject<any>(); }

    emitMsg(msg:any){
        this.subject.next(msg);
    }

    getMsgObservable():Observable<any>{
        return this.subject.asObservable();
    }

    round(number:number, precision:number) {
      let shift = function (number:number, precision:number, reverseShift:boolean) {
        if (reverseShift) {
          precision = -precision;
        }  
        let numArray = ("" + number).split("e");
        return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
      };
      return shift(Math.round(shift(number, precision, false)), precision, true);
    }
    
    getQuote(): Observable<any> {
        const url = "https://api.cbix.ca/v1/index";
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.get(url, {'headers': headers}).map((d:any) => {
            if(d && d.exchanges){
                return d.exchanges;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getTransferFee(): Observable<any> {
        // return { "fastestFee": 40, "halfHourFee": 20, "hourFee": 10 } (in satoshis per byte)
        const url = "https://bitcoinfees.earn.com/api/v1/fees/recommended";
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.get(url, {'headers': headers}).map((d:any) => {
            if(d){
                return d;
            }else{
                return null;
            }
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }


    purchase(stripeToken:any, amount:number, currency:string, description:string, cardHoderName:string,
        billingAddr:any):Observable<any>{
        const url = this.API_URL + 'purchase';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = { 'headers': headers };
        return this.http.post(url, {'stripeToken':stripeToken, 
            'amount':amount*100, 'currency':currency, 'description':description,
            'billing':billingAddr }, options)
          .map(
              res => {
                return res;//.nProducts;
              }
          )
          .catch(
              err => {
                  return Observable.throw(err.message || err);
              }
          );
    }
}

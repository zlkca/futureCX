import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../environments/environment';

import { AuthService } from '../../account/auth.service';
import { SharedService } from '../shared.service';


declare var $: any;

@Component({
    providers:[AuthService],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogin:boolean = false;
    user:any;
    keyword:string;
    term$ = new Subject<string>();
    //wechat:any = new Wechat();

    constructor(private router:Router, private authServ:AuthService, private sharedServ:SharedService) {

        let self = this;

        this.term$.debounceTime(800).distinctUntilChanged().subscribe((keyword:any) => {
                self.search(keyword);
            });
    }

    ngOnInit() {
        let self = this;
        this.sharedServ.getMsgObservable().subscribe(msg => {
            if('OnUpdateHeader' === msg.name){
                self.setLoginByToken();
            }
        });
        self.setLoginByToken();
    }

    setLoginByToken(){
        let self = this;
        let token = self.authServ.getStorage('token');
        self.authServ.checkToken(token).subscribe(
          (r)=>{
            self.isLogin = r;
          },(err)=>{
            self.isLogin = false;
          });
    }

    // updateWechat(){
    //     let self = this;
    //     self.commerceServ.getWechat(1).subscribe(
    //       (r:Wechat) => {
    //           r.logo = self.commerceServ.getImage(r.logo);
    //           self.wechat = r;
    //       },
    //       (err:any) => {
    //           self.wechat = new Wechat();
    //           self.wechat.logo = self.commerceServ.getImage(self.wechat.logo);
    //       });
    // }

    search(keyword:string){
        let self = this;
        self.sharedServ.emitMsg({name:'OnSearch', query:{'keyword':keyword}})
    }

    closeNavMenu(){
      $('.navbar-collapse').removeClass('show');
    }

    toPage(url:string){
      this.closeNavMenu();
      this.router.navigate([url]);
    }

    changeLanguage(code:string){
      this.closeNavMenu();
      // this.translate.use(code);
    }

    logout(){
        let self = this;
        let flag = self.isLogin;

        this.closeNavMenu();
        if(flag){
          self.authServ.rmStorage('token');
          self.isLogin = false;
          this.router.navigate(['home'])
        }
    }
}

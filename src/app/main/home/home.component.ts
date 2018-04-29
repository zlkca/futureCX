import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

const AVERAGE_TRANSFER_BYTES = 250;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    rateBTC2CAD:number = 11000;
    amount:any = {CAD:0, BTC:0};
    cost:any = {CAD:0, BTC:0};
    total:any = {CAD:0, BTC:0};
    receive_addr:string = '';

    constructor(private sharedServ: SharedService) {

    }

    ngOnInit() {
        let self  = this;
        this.sharedServ.getQuote().subscribe(r =>{
            if(r && r.length){
                let s = 0;
                for(let t of r ){
                    s += parseFloat(t.bid);
                }
                self.rateBTC2CAD = s / r.length;
            }

            self.sharedServ.getTransferFee().subscribe( r=>{
              if(r && r.fastestFee){
                self.cost.BTC = parseFloat(r.fastestFee) * AVERAGE_TRANSFER_BYTES / 100000000;
                self.cost.CAD = self.sharedServ.round(self.cost.BTC * self.rateBTC2CAD, 2);
              }else{
                self.cost.CAD = 3;
                self.cost.BTC = self.sharedServ.round(3 / self.rateBTC2CAD, 6);
              }
            }, err=>{
                self.cost.CAD = 3;
                self.cost.BTC = self.sharedServ.round(3 / self.rateBTC2CAD, 6);
            });

        });
    }

    onUpdateBTC(){
      this.amount.BTC = this.sharedServ.round(this.amount.CAD/ this.rateBTC2CAD, 6);
      this.total.BTC = this.sharedServ.round(this.amount.BTC - this.cost.BTC, 6);
      this.total.CAD = this.amount.CAD - this.cost.CAD;
    }

    onUpdateCAD(){
      this.amount.CAD = this.sharedServ.round(this.amount.BTC * this.rateBTC2CAD, 2);
      this.total.CAD = this.amount.CAD - this.cost.CAD;
      this.total.BTC = this.sharedServ.round(this.amount.BTC - this.cost.BTC, 6);
    }


}

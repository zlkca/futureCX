import { Component, OnInit, Input, Inject } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import { Address } from '../../account/account';
import { PaymentService } from '../../payment/payment.service';

const STRIPE_CLIENT_KEY = environment.STRIPE.CLIENT_KEY
// stripe api
// declare let StripeCheckout: any;
//declare let Stripe: any;

@Component({
  selector: 'app-payment',
  providers:[PaymentService],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    _amount:number;
    card:any;
    stripe:any;
    billingAddr:Address = new Address();
    username:string;

    @Input()
    set amount(amount:number){
      this._amount = amount;
    }

    constructor(private paymentServ:PaymentService) {

    }

    ngOnInit() {

      this.paymentServ.renderCreditCard();
    }

    

    purchase(){
        // let self = this;

        // self.stripe.createToken(self.card).then(function(result:any) {
        //     if (result.error) {
        //       // Inform the customer that there was an error
        //       let cardError = document.getElementById('card-errors');
        //       cardError.textContent = result.error.message;
        //     } else {
        //       // Send the token to your server
        //       // self.sharedServ.purchase(result.token.id, 
        //       //   self.amount, 
        //       //   'cad', 
        //       //   'Test Purchase Bitcoin for CAD $'+ self.amount,
        //       //   self.cardHolderName,
        //       //   {'addr':self.billingAddr,
        //       //   'city':self.billingCity, 
        //       //   'province':self.billingProvince, 
        //       //   'country':self.billingCountry,
        //       //   'postalCode':self.billingPostalCode}).subscribe(
        //       //       (r:any)=>{
        //       //         var s = r;
        //       //         //self.openSuccessDlg(self.dialogTemplate);
        //       //       }
        //       //   );
        //     }
        // });
    }
}

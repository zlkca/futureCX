import { Component, OnInit, Input, Inject } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';
import { Address } from '../../account/account';

const STRIPE_CLIENT_KEY = environment.STRIPE.CLIENT_KEY
// stripe api
// declare let StripeCheckout: any;
//declare let Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    _amount:number;
    card:any;
    stripe:any;
    billingAddr:Address = new Address();

    @Input()
    set amount(amount:number){
      this._amount = amount;
    }

    constructor() {

    }

    ngOnInit() {

      this.renderCreditCard();
    }

    renderCreditCard(){
        this.stripe = Stripe(STRIPE_CLIENT_KEY);
        // let elements = this.stripe.elements();
        // let style = {
        //   base: {
        //     color: '#32325d',
        //     lineHeight: '18px',
        //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        //     fontSmoothing: 'antialiased',
        //     fontSize: '16px',
        //     '::placeholder': {
        //       color: '#aab7c4'
        //     }
        //   },
        //   invalid: {
        //     color: '#fa755a',
        //     iconColor: '#fa755a'
        //   }
        // };

        // // Create an instance of the card Element
        // this.card = elements.create('card', {style: style, hidePostalCode:true});

        // // Add an instance of the card Element into the `card-element` <div>
        // this.card.mount('#card-element');
        // this.card.addEventListener('change', function(event:any) {
        //   let cardError = document.getElementById('card-errors');
        //   if (event.error) {
        //     cardError.textContent = event.error.message;
        //   } else {
        //     cardError.textContent = '';
        //   }
        // });
    }

    stripeTokenHandler(token:any) {
      // // Insert the token ID into the form so it gets submitted to the server
      // let form = document.getElementById('payment-form');
      // let hiddenInput = document.createElement('input');
      // hiddenInput.setAttribute('type', 'hidden');
      // hiddenInput.setAttribute('name', 'stripeToken');
      // hiddenInput.setAttribute('value', token.id);
      // form.appendChild(hiddenInput);
      // // Submit the form
      // //form.submit();
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

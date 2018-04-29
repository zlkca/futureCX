import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

const STRIPE_CLIENT_KEY = environment.STRIPE.CLIENT_KEY

@Injectable()
export class PaymentService {
	card:any;
	stripe:any;


  constructor() { }

	renderCreditCard(){
        this.stripe = Stripe(STRIPE_CLIENT_KEY);
        let elements = this.stripe.elements();
        let style = {
          base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };

        // Create an instance of the card Element
        this.card = elements.create('card', {style: style, hidePostalCode:true});

        // Add an instance of the card Element into the `card-element` <div>
        this.card.mount('#card-element');
        this.card.addEventListener('change', function(event:any) {
          let cardError = document.getElementById('card-errors');
          if (event.error) {
            cardError.textContent = event.error.message;
          } else {
            cardError.textContent = '';
          }
        });
    }

    stripeTokenHandler(token:any) {
      // Insert the token ID into the form so it gets submitted to the server
      let form = document.getElementById('payment-form');
      let hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
      // Submit the form
      //form.submit();
    }
}

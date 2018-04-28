import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedService } from './shared.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[SharedService],
  declarations: [HeaderComponent, FooterComponent, PaymentComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [HeaderComponent, FooterComponent, PaymentComponent]
})
export class SharedModule { }

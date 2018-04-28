import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { LayoutComponent } from './main/layout/layout.component';
import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  { path: '', component:LayoutComponent,
      children:[
        // { path: 'products', component:ProductListComponent },
        // { path: 'product/:id', component:ProductComponent },
        { path: 'home', component:HomeComponent }
      ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
  ]
})
export class AppRoutingModule { }

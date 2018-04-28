import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

class MockAuthService extends AuthService {
  login(account: string, password: string): Observable<any> {
    return new Observable<any>((observer)=>{
      const {next, error} = observer;
      next({'token':'aaa', 'data':{username:'zlk', password:'123456', email:'zlk@gmail.com'}});
      return {unsubscribe() { }};
    });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    //TestBed.configureTestingModule({
    //  declarations: [ LoginComponent ],
    //   imports:[ FormsModule ],
    //   providers: [ { provide: AuthService, useClass: MockAuthService } ]
    //})
    //.compileComponents();
    TestBed.overrideComponent(
      LoginComponent,
      {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    );
  }));

  beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
// import { SharedService } from '../shared.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../account/auth.service';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../../shared/header/header.component';
class MockRouter{
  navigate(){
    
  }
}

class MockAuthService extends AuthService {
  login(account: string, password: string): Observable<any> {
    return new Observable<any>((observer)=>{
      const {next, error} = observer;
      console.log('run subscribe.......');
      //observer.next();
      //next({'token':'aaa', 'data':{username:'zlk', password:'123456', email:'zlk@gmail.com'}});
      return {unsubscribe() { }};
    });
  }
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      // imports: [FormsModule],
      providers: [{provide:Router, useClass:MockRouter},
            {provide: AuthService, useClass: MockAuthService}
      ]
      ,schemas: [NO_ERRORS_SCHEMA]
    })
    // .overrideComponent(
    //   HeaderComponent,
    //   {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    // )
    //.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

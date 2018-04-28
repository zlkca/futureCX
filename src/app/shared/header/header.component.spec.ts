import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../shared.module';
import { SharedService } from '../shared.service';
import { AuthService } from '../../account/auth.service';
import { HeaderComponent } from './header.component';
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

class MockRouter{

}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[FormsModule, HttpClientTestingModule],
      providers: [ { provide: AuthService, useClass: MockAuthService }, 
      {provide:Router, useClass: MockRouter},
      {provide:SharedService, useClass: SharedService} ]
    })
    .overrideComponent(
      HeaderComponent,
      {set: {providers: [{provide: AuthService, useClass: MockAuthService}]}}
    );//.compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

  });

  it('should create', () => {
    //expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
});

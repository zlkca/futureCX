import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule, HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock:HttpTestingController)=>{
      httpMock.verify();
  }));

  it('should be created', async(
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  ));

  it('login success', async(
      inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController ) => {

        service.login('zlk', '123456').subscribe( r => {
          //expect(r.token).toBe('aaa');
          //expect(r.data.username).toBe('zlk');
        });

        let req = httpMock.expectOne('http://localhost:8000/api/login');
        req.flush(
            {'token':'aaa', 'data':{username:'zlk', password:'123456', email:'zlk@gmail.com'}}
          );
      })
  ));

  it('login fail', async(
    inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController ) => {

      service.login('zlk', '123456').subscribe( r => {
        //expect(r.token).toBe('');
        //expect(r.data).toBe('');
      });

      let req = httpMock.expectOne('http://localhost:8000/api/login');
      req.flush(
          {'token':'', 'data':''}
        );
    })
  ));

});


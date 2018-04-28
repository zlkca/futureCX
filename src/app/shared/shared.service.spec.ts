import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [SharedService]
    });
  });

  it('should be created', inject([SharedService, HttpTestingController], (service: SharedService, httpServ:HttpTestingController) => {
    expect(service).toBeTruthy();
  }));

  it('should receives string message', inject([SharedService], (service: SharedService) => {
    // service.getMsgObservable().subscribe(msg => {
    //     expect(msg).toBe('Hello');
    // })
    // service.emitMsg('Hello');
  }));

  it('should receives json message', inject([SharedService], (service: SharedService) => {
    // service.getMsgObservable().subscribe(msg => {
    //     expect(msg.data).toBe('Hello');
    // })
    // service.emitMsg({data:'Hello'});
  }));
});

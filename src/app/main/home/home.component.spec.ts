import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { HomeComponent } from './home.component';

export class MockSharedService{
  getQuote(){
    return {
      subscribe: function(){

      }
    }
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[FormsModule],
      providers: [
        {provide:SharedService, useClass:MockSharedService}, 
      ]
      ,schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(
      HomeComponent,
      {set: {providers: [{provide: SharedService, useClass: MockSharedService}]}}
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});

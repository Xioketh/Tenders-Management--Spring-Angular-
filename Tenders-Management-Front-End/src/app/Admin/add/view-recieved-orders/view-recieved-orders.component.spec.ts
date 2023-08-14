import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecievedOrdersComponent } from './view-recieved-orders.component';

describe('ViewRecievedOrdersComponent', () => {
  let component: ViewRecievedOrdersComponent;
  let fixture: ComponentFixture<ViewRecievedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecievedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecievedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

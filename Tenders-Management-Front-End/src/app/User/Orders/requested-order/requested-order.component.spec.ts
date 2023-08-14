import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedOrderComponent } from './requested-order.component';

describe('RequestedOrderComponent', () => {
  let component: RequestedOrderComponent;
  let fixture: ComponentFixture<RequestedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

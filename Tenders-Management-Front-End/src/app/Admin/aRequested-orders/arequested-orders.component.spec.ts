import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArequestedOrdersComponent } from './arequested-orders.component';

describe('ArequestedOrdersComponent', () => {
  let component: ArequestedOrdersComponent;
  let fixture: ComponentFixture<ArequestedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArequestedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArequestedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestedOrdersViewComponent } from './user-requested-orders-view.component';

describe('UserRequestedOrdersViewComponent', () => {
  let component: UserRequestedOrdersViewComponent;
  let fixture: ComponentFixture<UserRequestedOrdersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRequestedOrdersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRequestedOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

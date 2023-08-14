import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOutstandingComponent } from './user-outstanding.component';

describe('UserOutstandingComponent', () => {
  let component: UserOutstandingComponent;
  let fixture: ComponentFixture<UserOutstandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOutstandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

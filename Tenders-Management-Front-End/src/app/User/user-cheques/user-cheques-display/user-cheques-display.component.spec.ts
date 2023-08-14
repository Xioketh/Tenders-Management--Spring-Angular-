import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChequesDisplayComponent } from './user-cheques-display.component';

describe('UserChequesDisplayComponent', () => {
  let component: UserChequesDisplayComponent;
  let fixture: ComponentFixture<UserChequesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChequesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChequesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

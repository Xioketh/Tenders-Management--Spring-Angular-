import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChequesComponent } from './user-cheques.component';

describe('UserChequesComponent', () => {
  let component: UserChequesComponent;
  let fixture: ComponentFixture<UserChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChequesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ABillComponent } from './abill.component';

describe('ABillComponent', () => {
  let component: ABillComponent;
  let fixture: ComponentFixture<ABillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ABillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ABillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

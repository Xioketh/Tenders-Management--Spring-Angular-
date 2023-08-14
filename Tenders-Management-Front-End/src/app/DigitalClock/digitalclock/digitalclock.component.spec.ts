import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalclockComponent } from './digitalclock.component';

describe('DigitalclockComponent', () => {
  let component: DigitalclockComponent;
  let fixture: ComponentFixture<DigitalclockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalclockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitalclockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

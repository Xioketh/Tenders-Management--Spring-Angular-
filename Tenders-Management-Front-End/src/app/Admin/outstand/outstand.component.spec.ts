import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandComponent } from './outstand.component';

describe('OutstandComponent', () => {
  let component: OutstandComponent;
  let fixture: ComponentFixture<OutstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

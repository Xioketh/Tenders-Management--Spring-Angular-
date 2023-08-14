import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AChequeComponent } from './acheque.component';

describe('AChequeComponent', () => {
  let component: AChequeComponent;
  let fixture: ComponentFixture<AChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

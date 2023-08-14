import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQutationsComponent } from './send-qutations.component';

describe('SendQutationsComponent', () => {
  let component: SendQutationsComponent;
  let fixture: ComponentFixture<SendQutationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQutationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendQutationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

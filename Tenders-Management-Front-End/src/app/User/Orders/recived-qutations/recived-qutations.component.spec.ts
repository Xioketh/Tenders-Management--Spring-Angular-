import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedQutationsComponent } from './recived-qutations.component';

describe('RecivedQutationsComponent', () => {
  let component: RecivedQutationsComponent;
  let fixture: ComponentFixture<RecivedQutationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecivedQutationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecivedQutationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

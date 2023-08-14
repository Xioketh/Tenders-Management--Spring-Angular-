import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsuppliersComponent } from './asuppliers.component';

describe('AsuppliersComponent', () => {
  let component: AsuppliersComponent;
  let fixture: ComponentFixture<AsuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsuppliersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

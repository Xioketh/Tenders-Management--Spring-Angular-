import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverGoodsComponent } from './deliver-goods.component';

describe('DeliverGoodsComponent', () => {
  let component: DeliverGoodsComponent;
  let fixture: ComponentFixture<DeliverGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverGoodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxGraphComponent } from './tax-graph.component';

describe('TaxGraphComponent', () => {
  let component: TaxGraphComponent;
  let fixture: ComponentFixture<TaxGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

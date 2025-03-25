import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquityAnalysisComponent } from './equity-analysis.component';

describe('EquityAnalysisComponent', () => {
  let component: EquityAnalysisComponent;
  let fixture: ComponentFixture<EquityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquityAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

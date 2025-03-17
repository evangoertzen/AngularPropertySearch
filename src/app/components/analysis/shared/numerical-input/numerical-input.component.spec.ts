import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalInputComponent } from './numerical-input.component';

describe('NumericalInputComponent', () => {
  let component: NumericalInputComponent;
  let fixture: ComponentFixture<NumericalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericalInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumericalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

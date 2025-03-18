import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeverToggleComponent } from './lever-toggle.component';

describe('LeverToggleComponent', () => {
  let component: LeverToggleComponent;
  let fixture: ComponentFixture<LeverToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeverToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeverToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

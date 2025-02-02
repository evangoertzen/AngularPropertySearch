import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDisplayComponent } from './rent-display.component';

describe('RentDisplayComponent', () => {
  let component: RentDisplayComponent;
  let fixture: ComponentFixture<RentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

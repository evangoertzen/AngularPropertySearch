import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHomeInfoComponent } from './full-home-info.component';

describe('FullHomeInfoComponent', () => {
  let component: FullHomeInfoComponent;
  let fixture: ComponentFixture<FullHomeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullHomeInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullHomeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

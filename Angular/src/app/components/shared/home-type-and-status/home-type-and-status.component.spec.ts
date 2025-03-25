import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeAndStatusComponent } from './home-type-and-status.component';

describe('HomeTypeAndStatusComponent', () => {
  let component: HomeTypeAndStatusComponent;
  let fixture: ComponentFixture<HomeTypeAndStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTypeAndStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTypeAndStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAndSortComponent } from './filter-and-sort.component';

describe('FilterAndSortComponent', () => {
  let component: FilterAndSortComponent;
  let fixture: ComponentFixture<FilterAndSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAndSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAndSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

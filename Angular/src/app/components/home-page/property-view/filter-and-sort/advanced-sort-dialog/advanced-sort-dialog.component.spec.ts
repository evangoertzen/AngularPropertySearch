import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSortDialogComponent } from './advanced-sort-dialog.component';

describe('AdvancedSortDialogComponent', () => {
  let component: AdvancedSortDialogComponent;
  let fixture: ComponentFixture<AdvancedSortDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedSortDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedSortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

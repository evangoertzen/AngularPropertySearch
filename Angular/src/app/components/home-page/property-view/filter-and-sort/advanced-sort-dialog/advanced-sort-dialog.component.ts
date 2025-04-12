import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-advanced-sort-dialog',
  templateUrl: './advanced-sort-dialog.component.html',
  styleUrl: './advanced-sort-dialog.component.css',
  standalone: false
})
export class AdvancedSortDialogComponent {

  constructor(
    public searchService: PropertySearchService,
    public dialogRef: MatDialogRef<AdvancedSortDialogComponent>,
  ){}

  onContinue(){
    this.dialogRef.close(true);
  }


}

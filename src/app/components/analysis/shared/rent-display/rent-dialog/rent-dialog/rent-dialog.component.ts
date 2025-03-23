import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertySearchService } from 'src/app/services/property-search/property-search.service';

@Component({
  selector: 'app-rent-dialog',
  templateUrl: './rent-dialog.component.html',
  styleUrl: './rent-dialog.component.css',
  standalone: false
})
export class RentDialogComponent {

  constructor( 
    public dialogRef: MatDialogRef<RentDialogComponent>,
    public searchService: PropertySearchService
  ){}

  onContinue(){
    this.dialogRef.close(true);
  }

}

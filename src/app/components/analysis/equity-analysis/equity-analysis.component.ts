import { Component, Input } from '@angular/core';
import { PropertyModel } from 'src/app/models/property.model';

@Component({
  selector: 'app-equity-analysis',
  templateUrl: './equity-analysis.component.html',
  styleUrl: './equity-analysis.component.css',
  standalone: false
})
export class EquityAnalysisComponent {
  @Input() property: PropertyModel | null = null;

}

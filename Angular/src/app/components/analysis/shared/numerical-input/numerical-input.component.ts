import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatService } from 'src/app/services/format-service/format.service';

@Component({
  selector: 'app-numerical-input [modelField]',
  templateUrl: './numerical-input.component.html',
  styleUrls: ['./numerical-input.component.css'],
  standalone: false,
})
export class NumericalInputComponent {
  
  @Input() modelField!: number;
  @Output() modelFieldChange = new EventEmitter<number>();
  
  @Input() numType: 'PERCENT' | 'DOLLARS' | null = null;
  @Input() placeHolder: string = '';
  @Input() disabled: boolean = false;
  @Input() colorMode: string = 'default'; // 'GP-RM' color mode to make green when positive and red when negative
  
  constructor(public formatService: FormatService) {}

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value.replace(/,/g, ''); // Remove commas

    if(newValue != '')
    this.modelFieldChange.emit(parseFloat(newValue)); // Notify parent of new value
  }
}

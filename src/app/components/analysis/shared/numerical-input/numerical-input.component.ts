import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-numerical-input [modelField]',
  templateUrl: './numerical-input.component.html',
  styleUrl: './numerical-input.component.css',
  standalone: false
})
export class NumericalInputComponent {

  @Input()
  modelField!: number;

  @Output()
  modelFieldChange = new EventEmitter<number>();

  @Input()
  numType: 'PERCENT' | 'DOLLARS' = 'DOLLARS';

  @Input()
  placeHolder: string = '';

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    this.modelFieldChange.emit(newValue); // Notify parent of new value
  }
}

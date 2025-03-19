import { NgIf } from '@angular/common';
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
  numType: 'PERCENT' | 'DOLLARS' | null = null;

  @Input()
  placeHolder: string = '';

  @Input()
  disabled: boolean = false;

  @Input()
  colorMode: string = 'default'; // 'GP-RM' color mode to make green when positive and red when negative

  onInputChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).valueAsNumber;
    this.modelFieldChange.emit(newValue); // Notify parent of new value
  }

  formattedValue(val: number): string {
    return val % 1 === 0
        ? val.toFixed(0) 
        : val.toFixed(2);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-toggle',
  templateUrl: './filter-toggle.component.html',
  styleUrl: './filter-toggle.component.css',
  standalone: false
})
export class FilterToggleComponent {

  @Input() filterName: string = '';
  @Input() checked: boolean = false;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.toggled.emit(input.checked);
  }

}

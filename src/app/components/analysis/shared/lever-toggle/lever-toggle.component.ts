import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lever-toggle',
  templateUrl: './lever-toggle.component.html',
  styleUrl: './lever-toggle.component.css',
  standalone: false
})
export class LeverToggleComponent {
  
  @Output() 
  checkboxChanged = new EventEmitter<boolean>();

  @Input()
  isChecked = true;

  onCheckboxChange(){
    this.checkboxChanged.emit(this.isChecked);
  }

}

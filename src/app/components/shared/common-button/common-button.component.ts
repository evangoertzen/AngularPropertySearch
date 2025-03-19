import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-common-button',
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.css',
  standalone: false
})
export class CommonButtonComponent {

  @Input() text: string = '';

  @Output() onClickEmitter = new EventEmitter<any>();

  onButtonClicked(){
    this.onClickEmitter.emit();
  }

}

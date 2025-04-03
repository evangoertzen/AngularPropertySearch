import { Component } from '@angular/core';
import { ApplicationRef } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'PropertySearch';

  constructor(private appRef: ApplicationRef) {
    setInterval(() => {
      this.appRef.tick(); // Forces Angular to check for changes
    }, 100);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkMode: boolean = false;

  constructor() {
    // Check if dark mode is already enabled in localStorage
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      this.darkMode = true;
    }
    this.applyDarkMode();
  }

  // Toggle dark mode
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString()); // Save to localStorage
    this.applyDarkMode();
  }

  // Apply the dark mode class to the body
  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode'); // Add the dark mode class to the body
    } else {
      document.body.classList.remove('dark-mode'); // Remove the dark mode class from the body
    }
  }
}

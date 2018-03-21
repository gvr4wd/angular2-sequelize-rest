import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './header-layout.component.html'
})
export class HeaderLayoutComponent {
  constructor() {
    // hide bar
    document.querySelector('body').classList.toggle('sidebar-hidden');
  }
}

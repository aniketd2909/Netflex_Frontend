import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() currentPage!: string;
  toggleButton!: boolean;
  ngOnInit() {
    if (this.currentPage == 'login') {
      this.toggleButton = false;
    } else if (this.currentPage == 'register' || this.currentPage == 'home') {
      this.toggleButton = true;
    }
  }
}

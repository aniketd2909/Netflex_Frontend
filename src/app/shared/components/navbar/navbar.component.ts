import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() currentPage!: string;
  toggleButton!: boolean;
  loggedIn!: boolean;
  user!: string | null;
  constructor(private router: Router) {}
  ngOnInit() {
    if (this.currentPage == 'login') {
      this.toggleButton = false;
    } else if (this.currentPage == 'register') {
      this.toggleButton = true;
    } else if (this.currentPage == 'movie') {
      this.toggleButton = true;
      this.loggedIn = true;
      if (
        typeof window !== 'undefined' &&
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('useremail')
      ) {
        this.user = localStorage.getItem('useremail');
      }
    } else if (
      this.currentPage == 'home' &&
      typeof window !== 'undefined' &&
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('useremail')
    ) {
      this.toggleButton = true;
      this.loggedIn = true;
      this.user = localStorage.getItem('useremail');
    } else {
      this.toggleButton = true;
    }
  }
  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('useremail');
    this.router.navigate(['home']);
    this.loggedIn = !this.loggedIn;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  user: any;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
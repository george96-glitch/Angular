import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  email = '';
  password = '';

  constructor(private router: Router) {}

  register() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    const exists = users.find((u: any) => u.email === this.email);

    if (exists) {
      alert('User already exists');
      return;
    }

    users.push({
      email: this.email,
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful');
    this.router.navigate(['/login']);
  }
}
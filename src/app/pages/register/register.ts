// register.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeTerms = false;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router) {}

  register() {
    // Reset error
    this.errorMessage = '';

    // Validation checks
    if (!this.fullName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      this.animateError();
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.animateError();
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      this.animateError();
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.animateError();
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the Terms and Conditions';
      this.animateError();
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find((u: any) => u.email === this.email);

    if (userExists) {
      this.errorMessage = 'User with this email already exists';
      this.animateError();
      return;
    }

    // Create new user
    this.isLoading = true;

    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        registeredAt: new Date().toISOString(),
        courses: [],
        achievements: []
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Auto-login after registration
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));

      this.showSuccessMessage('Account created successfully! Redirecting...');
      
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    }, 800);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private animateError() {
    const errorDiv = document.querySelector('.error-message');
    errorDiv?.classList.add('fade-in');
    setTimeout(() => {
      errorDiv?.classList.remove('fade-in');
    }, 500);
  }

  private showSuccessMessage(message: string) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    const card = document.querySelector('.register-card');
    card?.insertBefore(successDiv, card.firstChild);
    
    setTimeout(() => {
      successDiv.remove();
    }, 1500);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getPasswordStrength(): number {
  if (!this.password) return 0;
  
  let strength = 0;
  if (this.password.length >= 6) strength += 20;
  if (this.password.length >= 8) strength += 20;
  if (/[A-Z]/.test(this.password)) strength += 20;
  if (/[0-9]/.test(this.password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(this.password)) strength += 20;
  
  return strength;
}

getStrengthColor(): string {
  const strength = this.getPasswordStrength();
  if (strength < 40) return '#ef4444';
  if (strength < 70) return '#f59e0b';
  return '#10b981';
}

getStrengthText(): string {
  const strength = this.getPasswordStrength();
  if (strength < 40) return 'Weak password';
  if (strength < 70) return 'Medium password';
  return 'Strong password';
}
}
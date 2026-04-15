// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  rememberMe = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

  login() {
    // Reset error message
    this.errorMessage = '';
    
    // Enhanced validation
    if (!this.email || !this.password) {
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

    // Show loading state
    this.isLoading = true;

    // Simulate async operation for better UX
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        const user = users.find(
          (u: any) =>
            u.email === this.email &&
            u.password === this.password
        );
        
        if (user) {
          // Handle remember me
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          
          // Store user session
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          
          // Show success message
          this.showSuccessMessage('Login successful! Redirecting...');
          
          // Navigate after short delay
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        } else {
          this.errorMessage = 'Invalid email or password';
          this.isLoading = false;
          this.animateError();
          
          // Shake the form
          const form = document.querySelector('.login-card');
          form?.classList.add('shake');
          setTimeout(() => {
            form?.classList.remove('shake');
          }, 500);
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again.';
        this.isLoading = false;
      }
    }, 800);
  }

  // Make this method public by removing 'private' keyword
  isValidEmail(email: string): boolean {
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
    const card = document.querySelector('.login-card');
    card?.insertBefore(successDiv, card.firstChild);
    
    setTimeout(() => {
      successDiv.remove();
    }, 1500);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Social login placeholders
  loginWithGoogle() {
    // Implement Google OAuth
    console.log('Google login clicked');
  }

  loginWithGithub() {
    // Implement GitHub OAuth
    console.log('GitHub login clicked');
  }
}
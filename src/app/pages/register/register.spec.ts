// register.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn() // Use vi.fn() instead of jasmine.createSpy
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format', () => {
    component.email = 'invalid-email';
    component.register();
    expect(component.errorMessage).toBe('Please enter a valid email address');
  });

  it('should require password match', () => {
    component.password = 'password123';
    component.confirmPassword = 'different';
    component.register();
    expect(component.errorMessage).toBe('Passwords do not match');
  });

  it('should require terms agreement', () => {
    component.agreeTerms = false;
    component.register();
    expect(component.errorMessage).toBe('Please agree to the Terms and Conditions');
  });

  it('should require all fields to be filled', () => {
    component.fullName = '';
    component.email = '';
    component.password = '';
    component.confirmPassword = '';
    component.register();
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should require password minimum length', () => {
    component.fullName = 'Test User';
    component.email = 'test@example.com';
    component.password = '123';
    component.confirmPassword = '123';
    component.agreeTerms = true;
    component.register();
    expect(component.errorMessage).toBe('Password must be at least 6 characters');
  });

  it('should successfully register a new user', () => {
    // Clear existing users
    localStorage.setItem('users', JSON.stringify([]));
    
    component.fullName = 'New User';
    component.email = 'newuser@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.agreeTerms = true;
    
    component.register();
    
    // Check if user was created
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('newuser@example.com');
  });

  it('should not register duplicate user', () => {
    // Add existing user
    const existingUser = { email: 'existing@example.com', password: 'pass123' };
    localStorage.setItem('users', JSON.stringify([existingUser]));
    
    component.fullName = 'Duplicate User';
    component.email = 'existing@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    component.agreeTerms = true;
    
    component.register();
    
    expect(component.errorMessage).toBe('User with this email already exists');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  it('should toggle confirm password visibility', () => {
    expect(component.showConfirmPassword).toBe(false);
    component.toggleConfirmPasswordVisibility();
    expect(component.showConfirmPassword).toBe(true);
    component.toggleConfirmPasswordVisibility();
    expect(component.showConfirmPassword).toBe(false);
  });

  it('should calculate password strength correctly', () => {
    component.password = 'weak';
    expect(component.getPasswordStrength()).toBeLessThan(40);
    
    component.password = 'Medium123';
    expect(component.getPasswordStrength()).toBeGreaterThanOrEqual(40);
    
    component.password = 'StrongP@ssw0rd123';
    expect(component.getPasswordStrength()).toBeGreaterThanOrEqual(80);
  });

  it('should return correct strength color', () => {
    component.password = 'weak';
    expect(component.getStrengthColor()).toBe('#ef4444');
    
    component.password = 'Medium123';
    expect(component.getStrengthColor()).toBe('#f59e0b');
    
    component.password = 'StrongP@ssw0rd123';
    expect(component.getStrengthColor()).toBe('#10b981');
  });
});
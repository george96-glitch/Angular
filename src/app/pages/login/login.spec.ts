// login.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn() // Use vi.fn() instead of jasmine.createSpy
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email format', () => {
    component.email = 'invalid-email';
    component.password = 'password123';
    component.login();
    expect(component.errorMessage).toBe('Please enter a valid email address');
  });

  it('should show error when fields are empty', () => {
    component.email = '';
    component.password = '';
    component.login();
    expect(component.errorMessage).toBe('Please fill in all fields');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  it('should successfully login with valid credentials', () => {
    // Create a test user
    const testUser = { email: 'test@example.com', password: 'password123' };
    localStorage.setItem('users', JSON.stringify([testUser]));
    
    component.email = 'test@example.com';
    component.password = 'password123';
    component.login();
    
    // Check if logged in user is stored
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    expect(loggedInUser).toBeTruthy();
    expect(loggedInUser.email).toBe('test@example.com');
  });

  it('should show error for invalid credentials', () => {
    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.login();
    
    expect(component.errorMessage).toBe('Invalid email or password');
  });
});
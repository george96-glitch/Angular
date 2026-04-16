// dashboard.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: vi.fn() // Use vi.fn() instead of jasmine.createSpy
    };

    // Mock localStorage
    const mockUser = { email: 'test@example.com', fullName: 'Test User' };
    vi.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(mockUser));
    vi.spyOn(localStorage, 'removeItem');

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, FormsModule, CommonModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set greeting based on time of day', () => {
    component.setGreeting();
    expect(component.greeting).toBeDefined();
    expect(['Good Morning', 'Good Afternoon', 'Good Evening']).toContain(component.greeting);
  });

  it('should logout and navigate to login', () => {
    component.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('loggedInUser');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should filter courses correctly', () => {
    component.selectedFilter = 'completed';
    const filtered = component.getFilteredCourses();
    expect(filtered.every(c => c.progress === 100)).toBe(true);
    
    component.selectedFilter = 'in-progress';
    const inProgress = component.getFilteredCourses();
    expect(inProgress.every(c => c.progress > 0 && c.progress < 100)).toBe(true);
    
    component.selectedFilter = 'not-started';
    const notStarted = component.getFilteredCourses();
    expect(notStarted.every(c => c.progress === 0)).toBe(true);
  });

  it('should get correct priority color', () => {
    expect(component.getPriorityColor('high')).toBe('#ef4444');
    expect(component.getPriorityColor('medium')).toBe('#f59e0b');
    expect(component.getPriorityColor('low')).toBe('#10b981');
    expect(component.getPriorityColor('unknown')).toBe('#6b7280');
  });

  it('should get correct progress color', () => {
    expect(component.getProgressColor(90)).toBe('#10b981');
    expect(component.getProgressColor(60)).toBe('#f59e0b');
    expect(component.getProgressColor(30)).toBe('#f97316');
    expect(component.getProgressColor(10)).toBe('#ef4444');
  });

  it('should filter activities by search query', () => {
    component.searchQuery = 'JavaScript';
    const filtered = component.getFilteredActivities();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].title).toContain('JavaScript');
  });

  it('should update stats correctly', () => {
    component.updateStats();
    expect(component.stats.completedCourses).toBeDefined();
    expect(component.stats.inProgress).toBeDefined();
    expect(component.stats.totalCourses).toBe(component.courses.length);
  });
});
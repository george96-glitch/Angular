// dashboard.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  currentDate: Date = new Date();
  greeting: string = '';
  stats = {
    totalCourses: 6,
    completedCourses: 3,
    inProgress: 2,
    certificates: 4,
    totalHours: 48,
    averageScore: 85
  };
  
  recentActivities = [
    { id: 1, title: 'Completed JavaScript Module', date: '2024-01-15', type: 'completed', score: 92 },
    { id: 2, title: 'Started React Course', date: '2024-01-14', type: 'started', progress: 25 },
    { id: 3, title: 'Earned HTML Certificate', date: '2024-01-12', type: 'certificate', score: 88 },
    { id: 4, title: 'Completed CSS Project', date: '2024-01-10', type: 'completed', score: 95 }
  ];
  
  courses = [
    { id: 1, name: 'Web Development Fundamentals', progress: 100, icon: '🌐', color: '#4f46e5' },
    { id: 2, name: 'JavaScript Advanced', progress: 65, icon: '📜', color: '#f59e0b' },
    { id: 3, name: 'React Framework', progress: 30, icon: '⚛️', color: '#06b6d4' },
    { id: 4, name: 'Node.js Backend', progress: 0, icon: '🚀', color: '#10b981' },
    { id: 5, name: 'Database Design', progress: 45, icon: '🗄️', color: '#8b5cf6' },
    { id: 6, name: 'UI/UX Principles', progress: 80, icon: '🎨', color: '#ec4899' }
  ];
  
  upcomingTasks = [
    { id: 1, task: 'Complete JavaScript Assignment', dueDate: '2024-01-20', priority: 'high' },
    { id: 2, task: 'Submit React Project', dueDate: '2024-01-25', priority: 'medium' },
    { id: 3, task: 'Review CSS Concepts', dueDate: '2024-01-18', priority: 'low' }
  ];
  
  notifications = [
    { id: 1, message: 'New course available: TypeScript Mastery', time: '2 hours ago', read: false },
    { id: 2, message: 'Your certificate for HTML is ready', time: '1 day ago', read: false },
    { id: 3, message: 'Reminder: Web Dev webinar tomorrow', time: '2 days ago', read: true }
  ];
  
  showNotifications = false;
  showUserMenu = false;
  searchQuery = '';
  selectedFilter = 'all';

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.setGreeting();
    this.updateStats();
  }

  setGreeting() {
    const hour = this.currentDate.getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  updateStats() {
    // Calculate dynamic stats based on courses
    this.stats.completedCourses = this.courses.filter(c => c.progress === 100).length;
    this.stats.inProgress = this.courses.filter(c => c.progress > 0 && c.progress < 100).length;
    this.stats.totalCourses = this.courses.length;
    this.stats.averageScore = Math.floor(this.recentActivities
      .filter(a => a.score)
      .reduce((acc, curr) => acc + (curr.score || 0), 0) / this.recentActivities.filter(a => a.score).length);
  }

  getProgressColor(progress: number): string {
    if (progress >= 75) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    if (progress >= 25) return '#f97316';
    return '#ef4444';
  }

  getPriorityColor(priority: string): string {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  }

  getFilteredCourses() {
    if (this.selectedFilter === 'all') return this.courses;
    if (this.selectedFilter === 'completed') return this.courses.filter(c => c.progress === 100);
    if (this.selectedFilter === 'in-progress') return this.courses.filter(c => c.progress > 0 && c.progress < 100);
    if (this.selectedFilter === 'not-started') return this.courses.filter(c => c.progress === 0);
    return this.courses;
  }

  getFilteredActivities() {
    if (!this.searchQuery) return this.recentActivities;
    return this.recentActivities.filter(activity => 
      activity.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  continueCourse(course: any) {
    console.log('Continuing course:', course.name);
    // Navigate to course page
  }

  markNotificationAsRead(notification: any) {
    notification.read = true;
    this.showNotifications = false;
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showUserMenu = false;
    }
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (this.showUserMenu) {
      this.showNotifications = false;
    }
  }
}
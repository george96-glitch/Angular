# Student Portal - Angular Learning Management System

A modern, feature-rich **Student Portal** built with Angular that provides a complete learning management interface for students to manage their academic journey. The application features secure authentication, personalized dashboards, course tracking, and interactive learning tools.

## 🚀 Features

### Authentication System
- **Secure Login** - Email/password authentication with validation
- **User Registration** - New student account creation
- **Session Management** - Persistent login using localStorage
- **Remember Me** - Optional credential saving for convenience
- **Password Visibility Toggle** - Enhanced UX for password fields
- **Form Validation** - Real-time input validation with visual feedback

### Student Dashboard
- **Personalized Experience** - Dynamic welcome message based on time of day
- **Statistics Overview** - Track total courses, completion rates, average scores, and certificates
- **Course Management** - Monitor progress with visual progress bars and filtering options
- **Activity Timeline** - View recent learning activities and achievements
- **Task Management** - Upcoming assignments with priority indicators
- **Quick Actions** - Shortcut buttons for common tasks

### Interactive UI/UX
- **Modern Design** - Gradient backgrounds, card-based layout, smooth animations
- **Responsive Layout** - Mobile-friendly design that adapts to all screen sizes
- **Sidebar Navigation** - Persistent menu with quick access to all sections
- **Notification System** - Real-time alerts for course updates and deadlines
- **Search Functionality** - Filter courses and activities dynamically
- **Interactive Elements** - Hover effects, loading states, error animations

## 📸 Screenshots

### Login Page
![Login Page](https://raw.githubusercontent.com/george96-glitch/Angular/main/src/app/assets/images/Loginpage.png)

### Dashboard Overview
![Dashboard](https://raw.githubusercontent.com/george96-glitch/Angular/main/src/app/assets/images/Dashboardpage.png)



## 🛠️ Technology Stack

- **Framework**: Angular 21.2.7 (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **State Management**: Local Storage for session data
- **Forms**: Angular Forms Module with two-way binding
- **Testing**: Vitest for unit tests

## 📁 Project Structure
student-portal/
├── src/
│ ├── app/
│ │ ├── pages/
│ │ │ ├── login/
│ │ │ │ ├── login.component.ts
│ │ │ │ ├── login.component.html
│ │ │ │ ├── login.component.css
│ │ │ │ └── login.spec.ts
│ │ │ ├── register/
│ │ │ │ ├── register.component.ts
│ │ │ │ ├── register.component.html
│ │ │ │ ├── register.component.css
│ │ │ │ └── register.spec.ts
│ │ │ └── dashboard/
│ │ │ ├── dashboard.component.ts
│ │ │ ├── dashboard.component.html
│ │ │ ├── dashboard.component.css
│ │ │ └── dashboard.spec.ts
│ │ ├── services/
│ │ │ ├── auth.service.ts
│ │ │ └── course.service.ts
│ │ └── app.routes.ts
│ ├── assets/
│ │ └── images/
│ └── styles.css


## 🚦 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI (version 21.2.7)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/george96-glitch/Angular.git
cd Angular

Design System
Color Palette
Primary Gradient: Indigo to Purple (#667eea → #764ba2)

Success: Green (#10b981)

Warning: Amber (#f59e0b)

Error: Red (#ef4444)

Neutral: Slate gray palette for text and borders

Typography
Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

Scale: Modular scale based on 16px base

Animations
Smooth transitions (0.3s ease)

Loading spinners

Shake animations for errors

Slide-up/fade-in effects

Hover scale effects

🔒 Security Features
Route guards to protect authenticated pages

Session validation on dashboard load

Secure logout functionality

Input sanitization and validation

XSS protection through Angular's built-in sanitization

🗺️ Roadmap
Phase 2 (Coming Soon)
Backend API integration with Node.js/Express

Real-time notifications using WebSockets

Progress analytics with charts

Interactive quiz system

File upload for assignments

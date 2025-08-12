import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User | null = null;
  loading = true;
  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUserData() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
        this.loading = false;
      })
    );

    // If no user in subscription, try to get current user
    if (!this.user) {
      this.subscription.add(
        this.authService.getCurrentUser().subscribe({
          next: (response) => {
            this.user = response.user;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.router.navigate(['/login']);
          }
        })
      );
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        // Clear local data even if server logout fails
        this.authService['clearAuthData']();
      }
    });
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  getRoleDisplayName(): string {
    if (!this.user) return '';
    
    switch (this.user.role) {
      case 'admin':
        return 'Administrator';
      case 'representative':
        return 'Theatre Representative';
      default:
        return 'Movie Enthusiast';
    }
  }
} 
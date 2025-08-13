import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return of(false);
    }

    // Check role-based access
    const requiredRole = route.data?.['role'];
    if (requiredRole) {
      const userRole = this.authService.currentUserValue?.role;
      if (userRole !== requiredRole) {
        this.router.navigate(['/unauthorized']);
        return of(false);
      }
    }

    // Verify token is still valid
    return this.authService.checkAuth().pipe(
      map(response => {
        if (response.authenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (!this.authService.isAuthenticated || !this.authService.isAdmin) {
      this.router.navigate(['/unauthorized']);
      return of(false);
    }
    return of(true);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/dashboard']);
      return of(false);
    }
    return of(true);
  }
} 
import { Routes } from '@angular/router';
import { TheatreListComponent } from './features/theatre/theatre-list.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { RepDashboardComponent } from './features/rep/rep-dashboard.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MoviesComponent } from './features/movies/movies.component';
import { AuthGuard, AdminGuard, GuestGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'movies', 
    component: MoviesComponent
  },
  { 
    path: 'theatres', 
    component: TheatreListComponent
  },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin-demo', 
    component: AdminDashboardComponent
  },
  { 
    path: 'rep', 
    component: RepDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'representative' }
  },
  // Redirect authenticated users to dashboard
  { path: '**', redirectTo: 'home' }
];

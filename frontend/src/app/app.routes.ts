import { Routes } from '@angular/router';
import { TheatreListComponent } from './features/theatre/theatre-list.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { RepDashboardComponent } from './features/rep/rep-dashboard.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'theatres', component: TheatreListComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'rep', component: RepDashboardComponent },
  // Add other routes as needed
];

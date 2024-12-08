import { Route } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthGuard, LoginGuard} from "./guards/auth.guard";

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    // This is a catch-all route for when the user enters an invalid URL
    path: '**',
    redirectTo: '/main'
  },
];

import {Route} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthGuard, LoginGuard} from "./guards/auth.guard";
import {NotfoundComponent} from "./pages/notfound/notfound.component";

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: SignInComponent,
        canActivate: [LoginGuard]
    },
    // {
    //   path: 'main',
    //   loadComponent: () => import('./pages/main-page/main-page.component').then(m => m.MainPageComponent),
    //   canActivate: [AuthGuard],
    //   children: [
    //     {
    //       path: 'user',
    //       component: UserComponent
    //     }
    //   ]
    // },
    {
        path: 'demo',
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule),
    },
    {
        path: 'main',
        loadChildren: () => import('./pages/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard],
    },
    {
        // This is a catch-all route for when the user enters an invalid URL
        path: '**',
        component: NotfoundComponent,
    },
];

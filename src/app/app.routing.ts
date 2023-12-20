import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch: 'full'
  },

  {
    path: 'Login',

    component: LoginComponent
      },
  {
    path: '',

    component: FullComponent,
    children: [



      {
        path: 'Main',
        redirectTo: '/certificate',
        pathMatch: 'full'
      },
      {
        path: '',

        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        canActivate : [AuthGuard],
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];


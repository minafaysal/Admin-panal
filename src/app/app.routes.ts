import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminLayoutComponent } from './modules/admin-layout/admin-layout/admin-layout.component';
import { AuthGuard } from './core/guards/auth.guard';


 export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

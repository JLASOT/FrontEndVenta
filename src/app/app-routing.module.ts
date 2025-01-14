import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/auth/service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login', // Redirige al login inicialmente
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
  },
  {
    canActivate: [authGuard],
    path:'dashboard',
    loadChildren:() => import("./modules/dashboard/dashboard.module").then(m => m.DashboardModule),
  },
  {
    canActivate: [authGuard],
    path: 'customer',
    loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule),
  },
  {
    canActivate: [authGuard],
    path: 'sale',
    loadChildren: () => import("./modules/sale/sale.module").then(m => m.SaleModule),
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error/404', // Redirige a una página de error 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children:[
      {
        path:'lista',
        component: CustomerListComponent,
      },
      {
        //coactívate:[adminGuard],
        path:'register',
        component: CustomerAddComponent
      }
      /* {
        
        path:'delete/:id',
        component: PatientDeleteComponent
      },
      {
        path:'edit/:id',
        component: PatientEditComponent
      }, */
      
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

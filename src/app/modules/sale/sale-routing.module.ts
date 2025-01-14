import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleAddComponent } from './sale-add/sale-add.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleComponent } from './sale.component';
const routes: Routes = [
  {
    path: '',
    component: SaleComponent,
    children:[
      {
        path:'lista',
        component: SaleListComponent,
      },
      {
        //coactívate:[adminGuard],
        path:'register',
        component: SaleAddComponent
      },
      /* {
        
        path:'delete/:id',
        component: PatientDeleteComponent
      },*/
    /*   {
        path:'edit/:id',
        component: SaleEditComponet
      },
       */
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }

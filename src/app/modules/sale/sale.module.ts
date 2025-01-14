import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { SaleAddComponent } from './sale-add/sale-add.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    SaleComponent,
    SaleAddComponent,
    SaleListComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SaleModule { }

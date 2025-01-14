import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService, Sale, SaleDetail } from '../service/sale.service';
import { CustomerService } from '../../customer/service/customer.service';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.css']
})
export class SaleAddComponent implements OnInit {
  sale: Sale = {
    idSale: 0,
    date: new Date().toISOString().split('T')[0], // Fecha actual
    amount: 0,
    idCustomer: 0,
    saleDetails: []
  };

  customers: Customer[] = [];
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    private saleService: SaleService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomerAll().subscribe({
      next: (data) => {
        this.customers = data;
        if (this.customers.length === 0) {
          this.errorMessage = 'No hay clientes disponibles.';
        }
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);
        this.errorMessage = 'Error al obtener la lista de clientes.';
      },
    });
  }

  // Agregar un detalle de venta
  addSaleDetail(): void {
    this.sale.saleDetails.push({
      idSaleDetail: 0,
      product: '',
      quantity: 1,
      precioV: 0
    });
  }

  // Eliminar un detalle de venta
  removeSaleDetail(index: number): void {
    this.sale.saleDetails.splice(index, 1);
  }

  // Enviar el formulario
  onSubmit(): void {
    if (!this.sale.idCustomer || this.sale.saleDetails.length === 0) {
      this.errorMessage = 'Debe seleccionar un cliente y agregar al menos un producto.';
      return;
    }

    this.isSubmitting = true;

    // Calcular el monto total
    this.sale.amount = this.sale.saleDetails.reduce((total, detail) => total + (detail.precioV * detail.quantity), 0);

    this.saleService.createSale(this.sale).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/sale/lista']);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error al crear la venta:', error);
      }
    });
  }
}

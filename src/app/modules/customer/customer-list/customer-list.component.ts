import { Component, OnInit } from '@angular/core';
//import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = []; // Variable para almacenar la lista de clientes
  errorMessage: string = ''; // Variable para manejar errores

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomerAll().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica aquí los datos
        this.customers = data; // Asignar los datos obtenidos
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
}

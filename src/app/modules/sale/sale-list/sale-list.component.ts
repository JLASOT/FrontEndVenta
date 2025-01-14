import { Component, OnInit } from '@angular/core';
import { Sale, SaleService } from '../service/sale.service';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from '../../customer/service/customer.service';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  sales: Sale[] = [];  // Aquí se almacenarán las ventas
  errorMessage: string = ''; // Variable para manejar errores

  selectedSale: Sale | null = null;  // Para almacenar la venta seleccionada
  isModalOpen: boolean = false;  // Controlar la visibilidad del modal

  customers : Customer[] = []; // Variable para almacenar la lista de clientes
  constructor(private saleService: SaleService,private customerService : CustomerService,) { }

  ngOnInit(): void {
    this.loadSales();  // Llamar al método que carga las ventas al inicializar el componente
    this.getCustomers();
  }

  // Método para cargar todas las ventas
  loadSales(): void {
    this.saleService.getAllSales().subscribe(
      (sales) => {
        this.sales = sales;  // Asignar la respuesta al array sales
        console.log('Datos recibidos:', sales); // Verifica aquí los datos
      },
      (error) => {
        console.error('Error al cargar las ventas', error);  // Manejo de errores
      }
    );
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

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedSale = null;  // Limpiar los detalles de la venta seleccionada
  }
 

  viewSaleDetails(saleId: number): void {
    // Busca la venta seleccionada por ID
    const selectedSale = this.sales.find(sale => sale.idSale === saleId);
  
    if (selectedSale) {
      // Asigna la venta seleccionada
      this.selectedSale = { ...selectedSale };
  
      // Llama al servicio para obtener el cliente por ID
      this.customerService.getCustomerById(selectedSale.idCustomer).subscribe({
        next: (customer) => {
          if (this.selectedSale) {
            // Reemplaza el ID del cliente con su nombre
            //this.selectedSale.customerName  = customer.name;
            this.selectedSale.customerName = `${customer.name} ${customer.pSurname} ${customer.mSurname}`;
     
          }
        },
        error: (error) => {
          console.error('Error al obtener el cliente:', error);
        }
      });
  
      // Abre el modal
      this.isModalOpen = true;
    } else {
      console.error('Venta no encontrada');
    }
  }
  
  deleteSale(saleId: number): void {
    this.saleService.deleteSale(saleId).subscribe(
      () => {
        // Eliminar la venta de la lista local después de eliminarla en el servidor
        this.sales = this.sales.filter(sale => sale.idSale !== saleId);
      },
      (error) => {
        console.error('Error al eliminar la venta', error);
      }
    );
  }
  

}

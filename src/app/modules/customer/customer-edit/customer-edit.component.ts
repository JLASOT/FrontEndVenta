import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup = this.fb.group({}); // Inicialización vacía
  errorMessage: string = ''; // Para manejar los errores
  customerId: number = 0; // ID del cliente a editar

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute, // Para capturar el parámetro de la URL
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      pSurname: ['', Validators.required],
      mSurname: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
    });

    // Obtener el ID del cliente desde la URL
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Customer ID:', this.customerId); // Esto debería imprimir el ID correcto
    if (this.customerId) {
      // Cargar los datos del cliente
      this.loadCustomerData();
    }
  }

  // Método para cargar los datos del cliente
  loadCustomerData(): void {
    this.customerService.getCustomerById(this.customerId).subscribe(
      (customer: Customer) => {
        this.customerForm.patchValue(customer); // Rellenar el formulario con los datos del cliente
      },
      (error) => {
        this.errorMessage = 'No se pudo cargar la información del cliente.';
        console.error(error);
      }
    );
  }

  // Método para actualizar el cliente
  onSubmit(): void {
    if (this.customerForm.valid) {
      const customer: Customer = {
        ...this.customerForm.value,
        idCustomer: this.customerId, // Asegurarte de incluir el ID
      };
      this.customerService.updateCustomer(customer).subscribe(
        (response) => {
          console.log('Cliente actualizado exitosamente', response);
          this.router.navigate(['/customer/lista']); // Redirigir a la lista de clientes
        },
        (error) => {
          this.errorMessage = 'Hubo un error al actualizar el cliente.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}

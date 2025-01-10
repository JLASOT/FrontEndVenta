import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit{
  customerForm: FormGroup = this.fb.group({});  // Inicialización vacía
  errorMessage: string = ''; // Para manejar los errores

  constructor(
    private fb: FormBuilder, // Inyectar el FormBuilder
    private customerService: CustomerService, // Inyectar el servicio de cliente
    private router: Router // Inyectar el router
  ) {}

  ngOnInit(): void {
    // Definir el formulario con sus campos y validaciones
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      pSurname: ['', Validators.required],
      mSurname: ['', Validators.required],
      company: ['', Validators.required],
      phone: ['', Validators.required,Validators.pattern('^[0-9]*$')],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required]
    });
  }

   // Método para crear un cliente
   onSubmit(): void {
    if (this.customerForm.valid) {
      const customer: Customer = this.customerForm.value;
      this.customerService.createCustomer(customer).subscribe(
        (response) => {
          console.log('Cliente creado exitosamente', response);
          this.router.navigate(['/customer/lista']); // Redirigir a la lista de clientes
        },
        (error) => {
          this.errorMessage = 'Hubo un error al crear el cliente'; // Mostrar el error
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente'; // Mostrar mensaje si el formulario no es válido
    }
  }


}

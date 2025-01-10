import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';  // Asegúrate de que la ruta del servicio sea correcta
import { Customer } from 'src/app/model/customer';

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // Asegúrate de enviar el token en el formato correcto
  })
});

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  public getCustomerAll(): Observable<Customer[]> {
    const token = sessionStorage.getItem('token');  // Obtener el token del localStorage
    console.log('Token usado:', token); // Verificar el token
    if (token) {
      return this.http.get<Customer[]>(`${URL_SERVICIOS}/customer`, httpOptions(token)).pipe(
        catchError(this.handleError('getCustomerAll', []))
      );
    } else {
      return of([]);  // Si no hay token, devuelve un array vacío
    }
  }

    // Crear un nuevo cliente
    public createCustomer(customer: Customer): Observable<Customer> {
      const token = sessionStorage.getItem('token');  // Obtener el token del localStorage
      if (token) {
        return this.http.post<Customer>(`${URL_SERVICIOS}/customer`, customer, httpOptions(token)).pipe(
          catchError(this.handleError('createCustomer', customer))
        );
      } else {
        return of(customer);  // Si no hay token, devuelve el cliente sin cambios
      }
    }

  // Actualizar un cliente
  public updateCustomer(customer: Customer): Observable<Customer> {
    const token = sessionStorage.getItem('token');  // Obtener el token del localStorage
    if (token) {
      return this.http.put<Customer>(`${URL_SERVICIOS}/customer/${customer.idCustomer}`, customer, httpOptions(token)).pipe(
        catchError(this.handleError('updateCustomer', customer))
      );
    } else {
      return of(customer);  // Si no hay token, devuelve el cliente sin cambios
    }
  }

  // Eliminar un cliente
  public deleteCustomer(idCustomer: number): Observable<any> {
    const token = sessionStorage.getItem('token');  // Obtener el token del localStorage
    if (token) {
      return this.http.delete(`${URL_SERVICIOS}/customer/${idCustomer}`, httpOptions(token)).pipe(
        catchError(this.handleError('deleteCustomer'))
      );
    } else {
      return of(null);  // Si no hay token, no hace nada
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loguea el error para depuración
      return of(result as T); // Retorna el resultado predeterminado
    };
  }
}

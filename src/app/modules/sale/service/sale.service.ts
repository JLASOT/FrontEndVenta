import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config'; 

export interface Sale {
  idSale: number;
  date: string;
  amount: number;
  idCustomer: number;
  saleDetails: SaleDetail[];
  customerName?: string; // Nuevo campo opcional para el nombre del cliente
}
export interface SaleDetail {
  idSaleDetail: number;
  precioV: number;
  product: string;
  quantity: number;
}

const httpOptions = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  })
});

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  // Obtener todas las ventas
  public getAllSales(): Observable<Sale[]> {
    const token = sessionStorage.getItem('token'); // Obtener el token del sessionStorage
    if (token) {
      return this.http.get<Sale[]>(`${URL_SERVICIOS}/sale`, httpOptions(token)).pipe(
        catchError(this.handleError('getAllSales', []))
      );
    } else {
      return of([]); // Retorna un array vacío si no hay token
    }
  }

  // Obtener una venta por ID
  public getSaleById(id: number): Observable<Sale> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.get<Sale>(`${URL_SERVICIOS}/sale/${id}`, httpOptions(token)).pipe(
        catchError(this.handleError<Sale>(`getSaleById id=${id}`))
      );
    } else {
      return of({} as Sale); // Retorna un objeto vacío si no hay token
    }
  }

  // Crear una nueva venta
  public createSale(sale: Sale): Observable<Sale> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.post<Sale>(`${URL_SERVICIOS}/sale`, sale, httpOptions(token)).pipe(
        catchError(this.handleError('createSale', sale))
      );
    } else {
      return of(sale); // Retorna la venta sin cambios si no hay token
    }
  }

  // Actualizar una venta
  public updateSale(sale: Sale): Observable<Sale> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.put<Sale>(`${URL_SERVICIOS}/sale/${sale.idSale}`, sale, httpOptions(token)).pipe(
        catchError(this.handleError('updateSale', sale))
      );
    } else {
      return of(sale); // Retorna la venta sin cambios si no hay token
    }
  }

  // Eliminar una venta
  public deleteSale(idSale: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.http.delete(`${URL_SERVICIOS}/sale/${idSale}`, httpOptions(token)).pipe(
        catchError(this.handleError('deleteSale'))
      );
    } else {
      return of(null); // No hace nada si no hay token
    }
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Loguea el error
      return of(result as T); // Retorna un resultado predeterminado
    };
  }
}

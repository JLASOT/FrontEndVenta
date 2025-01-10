/* import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
 */
/* import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './../model/user';
import { URL_SERVICIOS } from '../../../config/config';  // Importando la URL del servicio

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlService = URL_SERVICIOS + '/auth';  // Ruta para autenticación

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.post<any>(this.urlService, JSON.stringify(user), httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        if (res.headers.has("Authorization")) {
          user.token = res.headers.get("Authorization");
          localStorage.setItem('token', 'Bearer ' + res.headers.get("Authorization"));
        }
        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log("AuthService error", error);
    return throwError("Error en el servicio de autenticación: " + error);
  }
}
 */

/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../../config/config';  // Importando la URL del servicio

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlService = URL_SERVICIOS + '/auth';  // Ruta para autenticación

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    const user = { email, password };  // Objeto simple para los datos del login
    return this.http.post<any>(this.urlService, JSON.stringify(user), httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        if (res.headers.has("Authorization")) {
          const token = res.headers.get("Authorization");
          localStorage.setItem('token', 'Bearer ' + token);
        }
        return res.body;  // Retorna la respuesta del cuerpo sin necesidad de un modelo
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log("AuthService error", error);
    return throwError("Error en el servicio de autenticación: " + error);
  }
}
 */
/* 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';  // Importa la URL del servicio

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(userName: string, password: string) {
    const loginUrl = `${URL_SERVICIOS}/token`;  // Ruta del backend para login

    return this.http.post<any>(loginUrl, { UserName: userName, Password: password }).pipe(
      map((response: any) => {
        // Si el backend devuelve un token, lo guardamos
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', 'Bearer ' + token);  // Guardamos el token en localStorage
          return { token };  // Devolvemos el token
        } else {
          throw new Error('Token no recibido');
        }
      }),
      catchError((error) => {
        console.error('Error en el servicio de login', error);
        throw error;
      })
    );
  } 
} */
/*
    login(userName: string, password: string) {
      const loginUrl = `${URL_SERVICIOS}/auth`;  // Ruta del backend para login
    
      return this.http.post<any>(loginUrl, { UserName: userName, Password: password }, { observe: 'response' }).pipe(
        map((response: any) => {
          // Verificar si la respuesta tiene un código de estado y encabezados
          if (response && response.headers) {
            const token = response.headers.get('Authorization');
            if (token) {
              localStorage.setItem('token', 'Bearer ' + token);  // Guardamos el token en localStorage
              return { token };  // Devolvemos el token
            } else {
              throw new Error('Token no recibido');
            }
          } else {
            throw new Error('Respuesta no válida');
          }
        }),
        catchError((error) => {
          console.error('Error en el servicio de login', error);
          throw error;
        })
      );
    }
    
}
*/



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';  // Configuración global
import { User } from '../../../model/user';  
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlService = `${URL_SERVICIOS}/token`;

  constructor(private http: HttpClient) {}

  public getToken(user: User): Observable<User> {
    return this.http.post<any>(this.urlService, JSON.stringify(user), httpOptions).pipe(
      map((res: HttpResponse<any>) => {
        if (res.headers.has("Authorization")) {
          const token = res.headers.get("Authorization"); // Obtener el token desde los headers
          /* user.token = res.headers.get("Authorization");
          localStorage.setItem('token', 'Bearer ' + res.headers.get("Authorization")); */
          if (token) { // Solo asigna si no es null
            user.token = token;
            //localStorage.setItem('token', 'Bearer ' + token);
            sessionStorage.setItem('token', 'Bearer ' + token);
          }
        }
        return user;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error("AuthService error", error);
    return throwError(() => new Error("Error de autenticación: " + error.message));
  }
}

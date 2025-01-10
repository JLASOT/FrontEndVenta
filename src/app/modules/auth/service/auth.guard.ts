import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { User } from './../../../model/user';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Usar inject para obtener una instancia de Router
  const user = new User();
  user.token = sessionStorage.getItem('token') ?? undefined;

  if (user.token !== undefined) { // Verificar si el token no es undefined
    console.log("token:", user.token);
    return true;
  } else {
    console.log("no hay token");
    router.navigate(['/auth/login']); // Redirigir a login si no hay token
    return false;
  }
};

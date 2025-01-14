import { Component } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

constructor(private router: Router,private authService: AuthService){}


public logout():void{
  this.authService.logout();
  this.router.navigate(['/auth/login']);
}

}

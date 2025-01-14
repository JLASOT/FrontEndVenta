import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {
 constructor(private router: Router,private authService: AuthService){}
  
  
  public logout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  
}

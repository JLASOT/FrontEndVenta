import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router,private authService: AuthService){}
  
  
  public logout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
  
}

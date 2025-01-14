import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = new User();
  errorMessage: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  public login(): void {
    this.authService.getToken(this.user).subscribe(
      (response: User) => {
        sessionStorage.setItem("token", response.token || '');
        this.redirectToDashboard();
      },
      (error) => {
        this.errorMessage = error.message;
        console.error("Error en login", this.errorMessage);
        this.router.navigate(['/auth/login']);
        alert("credenciales incorrectas");
      }
    );
  }

  public logout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  private redirectToDashboard(): void {
    this.router.navigate(['/sale/lista']);
  }

}

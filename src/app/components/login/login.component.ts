import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [HttpClientModule, FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {}

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    const apiUrl = 'http://localhost:3000/users';

    this.http.get<any[]>(apiUrl).subscribe(
      (users) => {
        const user = users.find(u => u.email === this.email && u.password === this.password);

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          alert('Login realizado com sucesso!');
          this.authService.login();
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        }
      },
      (error) => {
        console.error('Erro ao acessar o servidor:', error);
        this.errorMessage = 'Erro de servidor. Tente novamente mais tarde.';
      }
    );
  }
}

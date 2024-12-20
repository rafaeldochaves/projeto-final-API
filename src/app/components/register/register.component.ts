import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [HttpClientModule, CommonModule, FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  successMessage: string = '';  // Mensagem de sucesso
  errorMessage: string = '';    // Mensagem de erro

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.user.name && this.user.email && this.user.password) {
      // Envia os dados para o backend (json-server)
      this.http.post('http://localhost:3000/users', this.user).subscribe(
        (response) => {
          // Mensagem de sucesso
          this.successMessage = 'Usuário cadastrado com sucesso!';
          this.errorMessage = ''; // Limpa a mensagem de erro, se existir

          window.alert(this.successMessage);
          
          // Redireciona para a página de login após o cadastro
          this.router.navigate(['/login']);
        },
        (error) => {
          // Mensagem de erro
          this.errorMessage = 'Erro ao cadastrar o usuário! Tente novamente.';
          this.successMessage = ''; // Limpa a mensagem de sucesso, se existir
        }
      );
    } else {
      // Mensagem de erro caso algum campo esteja vazio
      this.errorMessage = 'Por favor, preencha todos os campos!';
      this.successMessage = ''; // Limpa a mensagem de sucesso, se existir
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);  // Navega para a tela de login
  }
}


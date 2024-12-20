import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [HttpClientModule, CommonModule, FormsModule],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: any = null;
  isEditing: boolean = false;
  updatedUser: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user); // currentUser deve conter o campo 'id'
      this.updatedUser = { ...this.currentUser };
    } else {
      alert('Usuário não encontrado. Redirecionando para login.');
      this.router.navigate(['/login']);
    }
  }

  // Atualizar os dados do usuário
  updateProfile(): void {
    const apiUrl = `http://localhost:3000/users/${this.currentUser.id}`;
  
    this.http.put(apiUrl, this.updatedUser).subscribe(
      (response) => {
        alert('Dados atualizados com sucesso!');
        this.currentUser = { ...this.updatedUser };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.isEditing = false;
      },
      (error) => {
        console.error('Erro ao atualizar os dados:', error);
        alert('Erro ao atualizar os dados. Verifique se o servidor está funcionando.');
      }
    );
  }

  // Remover o usuário
  deleteProfile(): void {
    const apiUrl = `http://localhost:3000/users/${this.currentUser.id}`;

    if (confirm('Tem certeza que deseja excluir sua conta?')) {
      this.http.delete(apiUrl).subscribe(
        () => {
          alert('Conta excluída com sucesso!');
          localStorage.removeItem('currentUser');
          window.location.href = '/login'; // Redireciona para o login
        },
        (error) => {
          console.error('Erro ao excluir a conta:', error);
          alert('Erro ao excluir a conta. Tente novamente.');
        }
      );
    }
  }

  // Ativar modo de edição
  enableEditMode(): void {
    this.isEditing = true;
  }

  // Cancelar edição
  cancelEdit(): void {
    this.isEditing = false;
    this.updatedUser = { ...this.currentUser }; // Reverte as alterações
  }
}

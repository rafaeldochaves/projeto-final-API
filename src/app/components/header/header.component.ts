import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  currentUser: any = null;

  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Verifique se há um usuário logado
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }

    this.authService.currentLoginStatus.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  logout(): void {
    localStorage.removeItem('currentUser'); // Remove o usuário do armazenamento local
    this.currentUser = null;
    this.authService.updateLoginStatus(false); // Atualiza o estado de login no serviço
    this.router.navigate(['/']); // Redireciona para a página inicial
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}

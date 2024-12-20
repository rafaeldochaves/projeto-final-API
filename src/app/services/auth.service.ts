import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Controla o estado de login
  currentLoginStatus = this.loggedIn.asObservable(); // Observable para monitorar o estado

  constructor() { }

  // Método para fazer login
  login() {
    this.loggedIn.next(true); // Atualiza o estado para logado
  }

  // Método para fazer logout
  logout() {
    this.loggedIn.next(false); // Atualiza o estado para deslogado
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }
}

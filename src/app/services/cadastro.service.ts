import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from '../components/register/register.component';

export interface Cadastro {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

@NgModule({
  imports: [
    BrowserModule,
    RegisterComponent
  ]
})

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  private apiUrl = 'http://localhost:3000/cadastros';
  

  constructor(private http: HttpClient) {}

  // CREATE
  createCadastro(cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.apiUrl, cadastro);
  }

  // READ
  getCadastros(): Observable<Cadastro[]> {
    return this.http.get<Cadastro[]>(this.apiUrl);
  }

  // UPDATE
  updateCadastro(id: number, cadastro: Cadastro): Observable<Cadastro> {
    return this.http.put<Cadastro>(`${this.apiUrl}/${id}`, cadastro);
  }

  // DELETE
  deleteCadastro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

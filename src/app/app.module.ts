import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Declare como standalone
  imports: [RouterModule, HeaderComponent] // Importar os módulos e componentes necessários
})

export class AppComponent {}

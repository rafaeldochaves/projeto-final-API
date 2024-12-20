import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  images = [
    'assets/images/gta6.jpg',
    'assets/images/cyberpunk.jpg',
    'assets/images/cod6.jpg'
  ];
}

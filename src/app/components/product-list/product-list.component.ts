import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: true // Se for standalone
})
export class ProductListComponent {
  products = [
    { name: 'X-Box', price: 2500, image: 'xbox.jpg' },
    { name: 'Play Station 5', price: 5000, image: 'ps5pro.jpg' },
    { name: 'PC Gamer', price: 10000, image: 'pc.jpg' }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} foi adicionado ao carrinho!`);
  }
}

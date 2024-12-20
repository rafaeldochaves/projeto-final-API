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
    { name: 'Produto 1', price: 2500, image: '../../../../public/xbox.jpg' },
    { name: 'Produto 2', price: 5000, image: '../../../../public/ps5pro.jpg' },
    { name: 'Produto 3', price: 10000, image: '../../../../public/pc.jpg' }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} foi adicionado ao carrinho!`);
  }
}

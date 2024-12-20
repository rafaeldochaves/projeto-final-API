import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  getCart() {
    return this.cart;
  }

  addToCart(product: any) {
    const item = this.cart.find(p => p.name === product.name);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  updateQuantity(product: any, quantity: number) {
    const item = this.cart.find(p => p.name === product.name);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart() {
    this.cart = [];
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex(item => item.name === product.name);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
  }
}

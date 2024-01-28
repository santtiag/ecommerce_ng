import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { RouterLinkWithHref } from '@angular/router';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TimeAgoPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // @Input({ required: true }) cart: Product[] = [];
  // total = signal(0);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  hideSideMenu = signal(true);

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  // Se aplica cuando no existe services, es decir, cuando la rama de comunicación es grande (nivel 4 o más )
  // ngOnChanges(changes: SimpleChanges) {
  //   const cart = changes['cart'];
  //   if (cart) {
  //     this.total.set(this.calcTotal())
  //   }
  // }
  // calcTotal(): number {
  //   return this.cart.reduce((total, product) => total + product.price, 0);
  // }

  stateBar = signal<'home' | 'about'>('home');

  changesStateBar(stateBar: 'home' | 'about') {
    this.stateBar.set(stateBar);
  }

  clearCart() {
    this.cart.update(() => [])
  }

}

import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref } from '@angular/router';
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  constructor() { }

  products = signal<Product[]>([]);

  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  // cart = signal<Product[]>([]);

  private productService = inject(ProductService);

  private categoriesService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnChanges() {
    // const category_id = changes['category_id'];
    // if (category_id) {
    this.getProducts();
    // }
  }

  ngOnInit() {
    // this.getProducts();
    this.getCategories();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Product added');
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: () => {
      }
    })
  }
  private getCategories() {
    this.categoriesService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        console.log(this.categories());

      },
      error: () => {
      }
    })
  }
}

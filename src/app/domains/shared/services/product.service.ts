import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);

  getProducts(category_id?: string) {
    const url = new URL(`https://api.escuelajs.co/api/v1/products`);
    if (category_id) {
      url.searchParams.set('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOneProduct(id: string) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}

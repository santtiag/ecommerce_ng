import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => {
      return import('./domains/shared/components/layout/layout.component')
    },
    children: [
      {
        path: '',
        loadComponent: () => {
          return import('./domains/products/pages/list/list.component')
        },
      },
      {
        path: 'about',
        loadComponent: () => {
          return import('./domains/info/pages/about/about.component')
        },
      },
      {
        path: 'product/:productId',
        loadComponent: () => {
          return import('./domains/products/pages/product-detail/product-detail.component')
        },
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => {
      return import('./domains/info/pages/not-found/not-found.component')
    },
  }
];

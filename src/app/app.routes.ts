import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/homepage/homepage.component').then(c => c.HomepageComponent),
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then(c => c.FaqComponent),
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news.component').then(c => c.NewsComponent),
  },
];

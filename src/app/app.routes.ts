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
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'sponsors',
    loadComponent: () => import('./pages/sponsors/sponsors.component').then(c => c.SponsorsComponent),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(c => c.PrivacyComponent),
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(c => c.TermsComponent),
  },
  {
    path: 'transfer-v2',
    loadComponent: () => import('./pages/transfer/transfer.component').then(c => c.TransferComponent),
  },
];

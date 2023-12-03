import { Route } from '@angular/router';
import { HomeComponent } from '../libs/home/feat/home.component';
import { DetailComponent } from '../libs/cat/feat/detail.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cat/:catId', component: DetailComponent },
  { path: '**', redirectTo: 'home' },
];

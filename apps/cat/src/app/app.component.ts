import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'cat-root',
  template: ` <router-outlet><router-outlet></router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {}

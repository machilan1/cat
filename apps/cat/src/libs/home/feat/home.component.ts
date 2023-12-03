import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatCardComponent } from '../ui/cat-card/cat-card.component';
import { HeaderComponent } from '../../shared/ui/header.component';

@Component({
  standalone: true,
  imports: [CatCardComponent, HeaderComponent],
  selector: 'cat-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cat-header></cat-header>
    <cat-card></cat-card>
  `,
})
export class HomeComponent {}

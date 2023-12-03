import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cat-header',
  template: `
    <header>
      <h1 class="text-3xl">貓咪認養區</h1>
    </header>
  `,
})
export class HeaderComponent {}

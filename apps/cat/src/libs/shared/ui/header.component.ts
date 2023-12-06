import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from './button.component';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cat-header',
  imports: [ButtonComponent, DialogComponent],
  template: `
    <header class="bg-red-100 h-16 flex items-center pl-4">
      <h1 class="text-3xl">貓咪認養區</h1>
    </header>
  `,
})
export class HeaderComponent {}

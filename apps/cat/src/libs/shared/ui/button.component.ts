import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButtonDirective],
  template: `
    <button hlmBtn>
      <ng-content></ng-content>
    </button>
  `,
  selector: 'cat-button',
})
export class ButtonComponent {}

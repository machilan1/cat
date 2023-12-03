import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div>Edit Dialog</div> `,
})
export class EditDialogComponent {}

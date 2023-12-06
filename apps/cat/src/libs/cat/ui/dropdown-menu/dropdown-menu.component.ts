import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import {
  BrnMenuDirective,
  BrnMenuGroupDirective,
  BrnMenuItemDirective,
  BrnMenuTriggerDirective,
} from '@spartan-ng/ui-menu-brain';
import {
  HlmMenuDirective,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmSubMenuDirective,
} from '@spartan-ng/ui-menu-helm';
import { HlmAlertDialogContentDirective } from '@spartan-ng/ui-alertdialog-helm';
import { BrnAlertDialogTriggerDirective } from '@spartan-ng/ui-alertdialog-brain';
import { DialogComponent } from '../../../shared/ui/dialog/dialog.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BrnMenuDirective,
    BrnMenuGroupDirective,
    BrnMenuItemDirective,
    BrnMenuTriggerDirective,
    HlmMenuDirective,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmSubMenuDirective,
    BrnAlertDialogTriggerDirective,
    HlmAlertDialogContentDirective,
    DialogComponent,
  ],
  selector: 'cat-dropdown',
  standalone: true,
  template: `
    <button
      class="text-3xl"
      [brnMenuTriggerFor]="menu"
      align="end"
      variant="link"
      size="icon"
      hlmBtn
    >
      ...
    </button>
    <ng-template #menu>
      <div hlm brnMenu>
        <div brnMenuGroup>
          <button (click)="onDelete()" hlm brnMenuItem>移除刊登</button>
        </div>
        <hlm-menu-separator />
        <div brnMenuGroup>
          <button (click)="onEdit()" hlm brnMenuItem>編輯</button>
        </div>
      </div>
    </ng-template>
  `,
})
export class DropdownComponent {
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  onDelete() {
    this.delete.emit('');
  }

  onEdit() {
    this.edit.emit('');
  }
}

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
    DialogComponent,
  ],
  selector: 'cat-dropdown',
  standalone: true,
  template: `
    <div>
      <button
        class="text-3xl "
        [brnMenuTriggerFor]="menu"
        align="end"
        variant="link"
        size="icon"
        hlmBtn
      >
        <svg
          class="
      fill-[#cccccc] hover:fill-[#333333] transition-colors duration-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
          />
        </svg>
      </button>
      <ng-template #menu>
        <div hlm brnMenu>
          <div brnMenuGroup>
            <button (triggered)="onDelete()" hlm brnMenuItem>移除刊登</button>
          </div>
          <hlm-menu-separator />
          <div brnMenuGroup>
            <button (triggered)="onEdit()" hlm brnMenuItem>編輯</button>
          </div>
        </div>
      </ng-template>
    </div>
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

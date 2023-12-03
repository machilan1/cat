import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BrnDialogCloseDirective,
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogDescriptionDirective,
  BrnDialogOverlayComponent,
  BrnDialogTitleDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogCloseDirective,
  HlmDialogContentDirective,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogOverlayDirective,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div hlmDialogContent *brnDialogContent="let ctx">
      <hlm-dialog-header>
        <h3 brnDialogTitle hlm>Edit profile</h3>
        <p brnDialogDescription hlm>
          Make changes to your profile here. Click save when you're done.
        </p>
      </hlm-dialog-header>
      <hlm-dialog-footer>
        <button hlmBtn type="submit">Save changes</button>
      </hlm-dialog-footer>
      <button brnDialogClose hlm>
        <span class="sr-only">Close</span>
        <hlm-icon class="flex h-4 w-4" size="100%" name="radixCross1" />
      </button>
    </div>
  `,
})
export class NewAdoptionDialogComponent {}

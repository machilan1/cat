import { Component, Input, ViewChild } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogCloseDirective,
  BrnDialogComponent,
  BrnDialogContentDirective,
  BrnDialogOverlayComponent,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogCloseDirective,
  HlmDialogContentDirective,
  HlmDialogDescriptionDirective,
  HlmDialogOverlayDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'cat-dialog',
  standalone: true,
  imports: [
    HlmDialogCloseDirective,
    HlmDialogContentDirective,
    HlmDialogOverlayDirective,
    HlmDialogDescriptionDirective,
    HlmIconComponent,
    HlmButtonDirective,
    HlmIconComponent,
    BrnDialogCloseDirective,
    BrnDialogComponent,
    BrnDialogContentDirective,
    BrnDialogOverlayComponent,
    BrnDialogTriggerDirective,
  ],
  template: `
    <brn-dialog closeDelay="100">
      <brn-dialog-overlay hlm />
      @if (!hideBtn) {
        <button brnDialogTrigger hlmBtn>
          {{ btnText }}
        </button>
      }

      <div hlmDialogContent *brnDialogContent="let ctx">
        <ng-content></ng-content>
        <button brnDialogClose hlm>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </brn-dialog>
  `,
})
export class DialogComponent {
  @Input() btnText = 'Button';
  @Input() hideBtn = false;

  @ViewChild(BrnDialogComponent) dialog!: BrnDialogComponent;

  close() {
    this.dialog.close();
  }

  open() {
    this.dialog.open();
  }
}

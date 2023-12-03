import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { ImageComponent } from '../../shared/ui/image/image.component';
import { ButtonComponent } from '../../shared/ui/button.component';
import { RouterModule } from '@angular/router';
import { CatEntity } from '../../adoption/data-access/models/cat.entity';
import { CAT_PLACEHOLDER } from '../../adoption/data-access/constants/cat-placeholder';
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
  imports: [
    BrnDialogCloseDirective,
    BrnDialogComponent,
    BrnDialogContentDirective,
    BrnDialogDescriptionDirective,
    BrnDialogOverlayComponent,
    BrnDialogTitleDirective,
    HlmDialogCloseDirective,
    HlmDialogContentDirective,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogOverlayDirective,
    HlmDialogTitleDirective,
    HlmIconComponent,
    BrnDialogTriggerDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ImageComponent,
    ButtonComponent,
    RouterModule,
  ],
  selector: 'cat-detail-card',
  template: `
    <section hlmCard class="max-w-[66vw] min-w-[50vw]">
      <div hlmCardHeader>
        <h3 hlmCardTitle>{{ cat.name }}</h3>
        <p hlmCardDescription>生日 : {{ cat.birth }}</p>
      </div>
      <div hlmCardContent>
        <cat-image></cat-image>
        <p class="mt-4  ">這是一隻笨笨的貓咪</p>
      </div>
      <div hlmCardFooter class="flex justify-end">
        <brn-dialog closeDelay="100">
          <brn-dialog-overlay hlm />
          <button brnDialogTrigger hlmBtn>登記領養</button>
        </brn-dialog>
      </div>
    </section>
  `,
})
export class CatDetailComponent {
  @Input() cat: CatEntity = CAT_PLACEHOLDER;
}

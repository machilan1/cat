import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { ImageComponent } from '../../../shared/ui/image/image.component';
import { ButtonComponent } from '../../../shared/ui/button.component';
import { RouterModule } from '@angular/router';
import { CatEntity } from '@cat/shared';

@Component({
  selector: 'cat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    RouterModule,
    ImageComponent,
    ButtonComponent,
  ],
  template: `
    <section hlmCard class="max-w-md">
      <div hlmCardHeader>
        <h3 hlmCardTitle>{{ cat.name }}</h3>
        <p hlmCardDescription>生日 : {{ cat.birth }}</p>
      </div>
      <div hlmCardContent>
        <cat-image></cat-image>
      </div>
      <div hlmCardFooter class="flex justify-end">
        <a [routerLink]="'/cat/' + cat.id">
          <cat-button>了解更多</cat-button>
        </a>
      </div>
    </section>
  `,
})
export class CatCardComponent {
  // Todo CatEntity
  @Input() cat!: CatEntity;
}

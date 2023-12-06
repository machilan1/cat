import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmAspectRatioDirective } from '@spartan-ng/ui-aspectratio-helm';
import { MOCK_IMAGE_URL } from '../../data-access/constants/mock-data';

@Component({
  standalone: true,
  imports: [HlmAspectRatioDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-hidden rounded-xl drop-shadow  ">
      <div [hlmAspectRatio]="16 / 9">
        <img alt="Mountain views" [src]="image" />
      </div>
    </div>
  `,
  selector: `cat-image`,
})
export class ImageComponent {
  constructor() {
    this.image = MOCK_IMAGE_URL;
  }
  image: string;
}

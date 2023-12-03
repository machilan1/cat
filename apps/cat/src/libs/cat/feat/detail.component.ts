import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CatDetailComponent } from '../ui/cat-detail.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CatDetailComponent],
  template: `
    <div class="h-screen flex justify-center ">
      <cat-detail-card></cat-detail-card>
    </div>
  `,
})
export class DetailComponent {
  #catId!: string;

  @Input() set catId(value: string) {
    // Todo set viewing cat
    this.#catId = value;
  }

  get catId() {
    return this.#catId;
  }
}

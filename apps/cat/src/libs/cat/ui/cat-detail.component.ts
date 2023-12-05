import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
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
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatEntity, CatsService } from '@cat/shared';
import {
  Query,
  QueryClient,
  injectMutation,
  injectQueryClient,
} from '@ngneat/query';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    BrnDialogCloseDirective,
    BrnDialogComponent,
    BrnDialogContentDirective,
    BrnDialogDescriptionDirective,
    BrnDialogOverlayComponent,
    BrnDialogTitleDirective,
    HlmDialogCloseDirective,
    HlmDialogContentDirective,
    HlmDialogDescriptionDirective,
    HlmInputDirective,
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
    ReactiveFormsModule,
  ],
  selector: 'cat-detail-card',
  template: `
    @if (cat) {
      <section hlmCard class="max-w-[66vw] min-w-[50vw]">
        <div hlmCardHeader>
          <div class="flex justify-between">
            <div>
              <h3 hlmCardTitle>{{ cat.name }}</h3>
              <p hlmCardDescription>生日 : {{ cat.birth }}</p>
            </div>
            <div>
              <div (click)="delete('' + cat.id)">delete icon</div>
              <!-- <div (click)="edit()">edit icon</div> -->
            </div>
          </div>
        </div>
        <div hlmCardContent>
          <cat-image></cat-image>
          <p>區域 : {{ cat.location }}</p>
          <p class="mt-4  ">{{ cat.description }}</p>
        </div>
        <div hlmCardFooter class="flex justify-end">
          @if (!adopted()) {
            <brn-dialog closeDelay="100">
              <brn-dialog-overlay hlm />
              <button brnDialogTrigger hlmBtn>登記認養</button>
              <div hlmDialogContent *brnDialogContent="let ctx">
                <h3 brnDialogTitle hlm>登記認養</h3>
                <hlm-dialog-header>
                  <p brnDialogDescription hlm>
                    請填寫您的聯絡資訊以利後續志工同仁與您聯絡
                  </p>
                </hlm-dialog-header>
                <form [formGroup]="form" (submit)="submit()">
                  <input formControlName="name" placeholder="認養人" hlmInput />
                  <input
                    formControlName="phone"
                    placeholder="連絡電話"
                    hlmInput
                  />
                  <input formControlName="email" placeholder="email" hlmInput />
                  <input
                    formControlName="location"
                    placeholder="所在地"
                    hlmInput
                  />
                  <hlm-dialog-footer>
                    <button
                      [ngClass]="{ 'text-gray-400': form.invalid }"
                      [disabled]="form.invalid"
                      brnDialogClose
                      hlmBtn
                      type="submit"
                    >
                      送出
                    </button>
                  </hlm-dialog-footer>
                </form>
              </div>
            </brn-dialog>
          } @else {
            <div [ngClass]="{ 'text-green-600': adopted() }">已被領養</div>
          }
        </div>
      </section>
    } @else {
      No cat found
    }
  `,
})
export class CatDetailComponent {
  #fb = inject(NonNullableFormBuilder);
  #mutation = injectMutation();
  #qc = injectQueryClient();
  #catServiece = inject(CatsService);
  @Input({ required: true }) cat!: CatEntity | null;

  form = this.#fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
  });

  adopted = signal(true);

  submit() {
    if (this.form.invalid) {
      return;
    }
    // Todo create adoption
    this.form.reset();
  }

  delete(catId: string) {
    alert('Delete');
    this.#mutation({
      mutationFn: ({ id }: { id: string }) =>
        this.#catServiece.catsControllerRemove({ id }),
      onSuccess: (data) => {
        this.#qc.setQueryData(['cats', catId], null);
        this.#qc.removeQueries({
          queryKey: ['cats', catId],
        });
        // todo 印為預設就是stale 了
        this.#qc.invalidateQueries({ queryKey: ['cats'] });
      },
      onError: (err) => {
        console.log({ err });
      },
    }).mutateAsync({ id: catId });
  }

  // edit(catId: number) {}
  // todo remove later
  // #mutateExp =
}

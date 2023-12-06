import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmInputDirective } from '../../../spartan/ui-input-helm/src/lib/hlm-input.directive';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LOCATIONS } from '../../../shared/data-access/constants/counties';
import { CatStateService } from '../../../adoption/data-access/services/cat-state.service';
import { CreateCatDto } from '@cat/shared';
import { DialogComponent } from '../../../shared/ui/dialog/dialog.component';

@Component({
  selector: 'cat-create-cat-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    ReactiveFormsModule,
    HlmButtonDirective,
    DialogComponent,
  ],
  template: `
    <cat-dialog btnText="刊登新毛毛">
      <form class="w-md" [formGroup]="form" (submit)="submit()">
        <div>
          <label>貓咪名稱</label>
          <input
            formControlName="name"
            placeholder="貓咪名稱"
            hlmInput
            type="text"
          />
        </div>
        <div>
          <label>生日</label>
          <input
            type="month"
            formControlName="birth"
            placeholder="生日"
            hlmInput
          />
        </div>
        <div>
          <label>所在地區</label>
          <select
            formControlName="location"
            placeholder="所在地區"
            hlmInput
            type=""
          >
            @for (location of LOCATIONS; track location) {
              <option [value]="location">{{ location }}</option>
            }
          </select>
        </div>
        <div>
          <label>其他資訊</label>
          <textarea
            class="resize-none h-20"
            rows="3"
            formControlName="description"
            placeholder="品種、性別等其他資訊"
            hlmInput
          ></textarea>
        </div>

        <button [disabled]="form.invalid" hlmBtn>新增</button>
      </form>
    </cat-dialog>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCatDialogComponent {
  #fb = inject(NonNullableFormBuilder);
  #catStateService = inject(CatStateService);

  @Output() sub = new EventEmitter();

  @ViewChild(DialogComponent) dialog!: DialogComponent;

  LOCATIONS = LOCATIONS;

  form = this.#fb.group({
    name: ['', Validators.required],
    birth: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
  });

  async submit() {
    if (this.form.invalid) {
      return;
    }
    // send request to create cat

    const payload: CreateCatDto = {
      avatar: ['https://genrandom.com/api/cat'],
      ...this.form.getRawValue(),
    };

    await this.#catStateService.createOne(payload);

    this.form.reset();

    this.dialog.close();
    this.sub.emit(this.form.getRawValue());
  }
}

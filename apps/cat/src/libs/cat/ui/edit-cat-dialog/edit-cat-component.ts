import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LOCATIONS } from '../../../shared/data-access/constants/counties';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { CatWithAdoption } from '../../../shared/data-access/models/cat-entity';
import { CatStateService } from '../../../adoption/data-access/services/cat-state.service';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cat-edit-dialog',
  imports: [ReactiveFormsModule, HlmButtonDirective, HlmInputDirective],
  template: `
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
  `,
})
export class EditCatDialogComponent implements AfterViewInit {
  #fb = inject(NonNullableFormBuilder);
  #carStateService = inject(CatStateService);

  LOCATIONS = LOCATIONS;

  @Input({ required: true }) cat!: CatWithAdoption;
  @Output() edited = new EventEmitter();

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

    await this.#carStateService.updateOne(this.cat.id, this.form.getRawValue());
    this.edited.emit('');
  }

  ngAfterViewInit() {
    this.form.patchValue(this.cat);
  }
}

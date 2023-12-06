import {
  ChangeDetectionStrategy,
  Component,
  Output,
  inject,
  EventEmitter,
  ViewChild,
  Input,
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
import { DialogComponent } from '../../../shared/ui/dialog/dialog.component';
import { AdoptionStateService } from '../../../adoption/data-access/services/adoption-state.service';
import { CatWithAdoption } from '../../../shared/data-access/models/cat-entity';
import { CreateAdoptionDto } from '@cat/shared';
import { BrnDialogCloseDirective } from '@spartan-ng/ui-dialog-brain';

@Component({
  selector: 'cat-create-adoption-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HlmInputDirective,
    ReactiveFormsModule,
    HlmButtonDirective,
    DialogComponent,
    BrnDialogCloseDirective,
    HlmButtonDirective,
    HlmInputDirective,
  ],
  template: `
    <cat-dialog btnText="登記領養">
      <h3>請填寫聯絡資訊</h3>
      <form [formGroup]="form" (submit)="submit()">
        <div>
          <label> 認養人姓名</label>
          <input formControlName="name" placeholder="姓名" hlmInput />
        </div>
        <div>
          <label> 所在地區</label>

          <select formControlName="location" hlmInput>
            @for (location of LOCATIONS; track location) {
              @if (location === '臺南市') {
                <option [value]="location">
                  {{ location }}
                </option>
              } @else {
                <option [value]="location">
                  {{ location }}
                </option>
              }
            }
          </select>
        </div>
        <div>
          <label> 連絡電話</label>
          <input formControlName="phone" placeholder="連絡電話" hlmInput />
        </div>
        <div>
          <label> 電子信箱</label>
          <input
            type="email"
            formControlName="email"
            placeholder="電子信箱"
            hlmInput
          />
        </div>
        <button hlmBtn>送出</button>
      </form>
    </cat-dialog>
  `,
  styles: [
    `
      form :is(input, textarea, select) {
        width: 100%;
        margin-bottom: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAdoptionDialogComponent {
  #fb = inject(NonNullableFormBuilder);
  #adoptionStateService = inject(AdoptionStateService);

  LOCATIONS = LOCATIONS;

  @Input({ required: true }) cat!: CatWithAdoption;

  @Output() sub = new EventEmitter();

  @ViewChild(DialogComponent) dialog!: DialogComponent;

  form = this.#fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(7)]],
    email: ['', [Validators.required, Validators.email]],
  });

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    const payload: CreateAdoptionDto = {
      adoptorEmail: formData.email,
      adoptorLocation: formData.location,
      adoptorName: formData.name,
      adoptorPhone: formData.phone,
      catId: this.cat.id,
    };

    this.#adoptionStateService.createAdoption(payload);

    this.form.reset();
    this.dialog.close();
  }
}

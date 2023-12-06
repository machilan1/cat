import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
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
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatWithAdoption } from '../../shared/data-access/models/cat-entity';
import { CreateAdoptionDialogComponent } from './create-adoption-dialog/create-adoption-dialog.component';
import { DropdownComponent } from './dropdown-menu/dropdown-menu.component';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { CatStateService } from '../../adoption/data-access/services/cat-state.service';
import { BrnDialogComponent } from '@spartan-ng/ui-dialog-brain';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { EditCatDialogComponent } from './edit-cat-dialog/edit-cat-component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmIconComponent,
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
    CreateAdoptionDialogComponent,
    DropdownComponent,
    BrnMenuTriggerDirective,
    BrnDialogComponent,
    DialogComponent,
    EditCatDialogComponent,
  ],

  selector: 'cat-detail-card',
  template: `
    @if (cat) {
      <div>{{ deleteRes().status }}</div>
      <section
        hlmCard
        class="max-w-[66vw] min-w-[50vw] transition-opacity duration-300"
        [ngClass]="{ 'opacity-50': deleteRes().status === 'pending' }"
      >
        <div hlmCardHeader>
          <div class="flex justify-between">
            <div>
              <h3 hlmCardTitle>{{ cat.name }}</h3>
              <p hlmCardDescription>生日 : {{ cat.birth }}</p>
            </div>
            <cat-dropdown
              (delete)="delete(+cat.id)"
              (edit)="edit()"
            ></cat-dropdown>
          </div>
        </div>
        <div hlmCardContent>
          <cat-image></cat-image>
          <div class="mt-6">
            <p>區域 : {{ cat.location }}</p>
            <p class="">{{ cat.description }}</p>
          </div>
        </div>
        <div hlmCardFooter class="flex justify-end">
          @if (!cat.adoption) {
            <cat-create-adoption-dialog
              [cat]="cat"
            ></cat-create-adoption-dialog>
          } @else {
            <div [ngClass]="{ 'text-green-600': cat.adoption }">
              {{ cat.adoption.adoptorName }} 已登記領養 {{ cat.name }}
            </div>
          }
        </div>
      </section>

      <cat-dialog #editDialog [hideBtn]="true">
        <cat-edit-dialog (edited)="edited()" [cat]="cat"></cat-edit-dialog>
      </cat-dialog>
    } @else {
      No cat found
    }
  `,
  styles: [``],
})
export class CatDetailComponent {
  #catStateService = inject(CatStateService);
  @Input({ required: true }) cat!: CatWithAdoption;

  @ViewChild('editDialog') dialog!: DialogComponent;

  deleteRes = this.#catStateService.deleteOne().result;

  async delete(catId: number) {
    if (confirm(`確定把${this.cat.name}從布告欄中移除?`)) {
      await this.#catStateService.deleteOne().mutateAsync({ id: catId });
    }
  }
  edit() {
    this.dialog.open();
  }

  edited() {
    this.dialog.close();
  }
}

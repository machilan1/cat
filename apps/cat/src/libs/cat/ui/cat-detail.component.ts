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
import { HlmButtonDirective } from '../../spartan/ui-button-helm/src/lib/hlm-button.directive';

import { CatWithAdoption } from '../../shared/data-access/models/cat-entity';
import { CreateAdoptionDialogComponent } from './create-adoption-dialog/create-adoption-dialog.component';
import { DropdownComponent } from './dropdown-menu/dropdown-menu.component';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { MenuStack } from '@angular/cdk/menu';
import { CatStateService } from '../../adoption/data-access/services/cat-state.service';
import { BrnDialogComponent } from '@spartan-ng/ui-dialog-brain';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { EditCatDialogComponent } from './edit-cat-dialog/edit-cat-component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HlmButtonDirective,
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
      <section hlmCard class="max-w-[66vw] min-w-[50vw]">
        <div hlmCardHeader>
          <div class="flex justify-between">
            <div>
              <!-- TODO remove this click trigger-->
              <h3 (click)="(delete)" hlmCardTitle>{{ cat.name }}</h3>
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
          <p>區域 : {{ cat.location }}</p>
          <p class="mt-4  ">{{ cat.description }}</p>
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
      <!-- Todo remove asd -->
      <cat-dialog #editDialog [hideBtn]="true">
        <cat-edit-dialog [cat]="cat"></cat-edit-dialog>
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

  delete(catId: number) {
    if (confirm(`確定把${this.cat.name}從布告欄中移除?`)) {
      this.#catStateService.deleteOne(catId);
    }
  }

  edit() {
    this.dialog.open();
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatCardComponent } from '../ui/cat-card/cat-card.component';
import { HeaderComponent } from '../../shared/ui/header.component';
import { CatStateService } from '../../adoption/data-access/services/cat-state.service';
import { JsonPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/ui/button.component';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { CreateCatDialogComponent } from '../../cat/ui/create-cat-dialog/create-cat-dialog.component';

@Component({
  standalone: true,
  imports: [
    CatCardComponent,
    HeaderComponent,
    JsonPipe,
    ButtonComponent,
    DialogComponent,
    CreateCatDialogComponent,
  ],
  selector: 'cat-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cat-header></cat-header>

    <div class="p-4 flex justify-end">
      <cat-create-cat-dialog></cat-create-cat-dialog>
    </div>
    @if (result(); as result) {
      @if (result.isLoading) {
        <p>loading</p>
      }
      @if (result.isSuccess) {
        <div class="grid grid-cols-4 gap-4 p-4">
          @for (cat of result.data; track cat.id) {
            <cat-card [cat]="cat"></cat-card>
          }
        </div>
      }
      @if (result.isError) {
        <p>failed</p>
      }
    }
  `,
})
export class HomeComponent {
  #catStateService = inject(CatStateService);
  result = this.#catStateService.findAll().result;
}

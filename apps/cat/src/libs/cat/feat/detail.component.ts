import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { CatDetailComponent } from '../ui/cat-detail.component';
import { CatStateService } from '../../adoption/data-access/services/cat.service';
import { Result } from '@ngneat/query/lib/types';
import { CatEntity } from '@cat/shared';
import { QueryObserverResult } from '@ngneat/query';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CatDetailComponent, JsonPipe],
  template: `
    <div class="h-screen flex justify-center ">
      @if (result(); as res) {
        @if (res.isLoading) {
          <div>loading</div>
        }
        @if (res.isSuccess) {
          <cat-detail-card [cat]="res.data"></cat-detail-card>
        }
        @if (res.isError) {
          <div>no found</div>
        }
      }
    </div>
  `,
})
export class DetailComponent {
  #catId!: string;
  #catStateService = inject(CatStateService);
  #injector = inject(Injector);
  @Input() set catId(value: string) {
    // Todo set viewing cat
    runInInjectionContext(this.#injector, () => {
      this.result = this.#catStateService.findOne(value).result;
    });
    this.#catId = value;
  }

  get catId() {
    return this.#catId;
  }

  result!: Result<QueryObserverResult<CatEntity, Error>>['result'];
}

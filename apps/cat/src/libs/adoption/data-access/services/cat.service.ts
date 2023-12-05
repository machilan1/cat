import {
  Injectable,
  inject,
  ɵsetAllowDuplicateNgModuleIdsForTest,
} from '@angular/core';
import { CatEntity, CatsService } from '@cat/shared';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatStateService {
  #catService = inject(CatsService);
  #query = injectQuery();
  #qc = injectQueryClient();
  #mutate = injectMutation();
  // Todo Fetch cats

  viewingCat$ = new Subject<CatEntity>();

  test() {
    // todo remove later
  }

  findAll() {
    return this.#query({
      queryKey: ['cats'] as const,
      queryFn: () => this.#catService.catsControllerFindAll(),
    });
  }

  findOne(catId: string) {
    return this.#query({
      queryKey: ['cats', catId] as const,
      queryFn: () => this.#catService.catsControllerFindOne({ id: catId }),
    });
  }

  /** createOne(createCatDto : CreateCatDto){
   *      retur this.#http.post(API_URL,createCatDto)
   * }
   *
   */

  // Todo remove cat

  /** deleteOne(catId:number){
   * return this.#http.delete(API_URL,catId)}
   *
   */
}

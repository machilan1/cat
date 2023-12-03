import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@ngneat/query';

@Injectable({ providedIn: 'root' })
export class CatService {
  #http = inject(HttpClient);
  #query = injectQuery();

  // Todo Fetch cats
  /**
   * findAll(){
   *  return this.#query({
   * queryKey : ['cats] as const,
   * queryFn:()=>this.#http.get<CatEntity[]>(API_URL)})
   * }
   *
   */

  // Todo add cat.

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

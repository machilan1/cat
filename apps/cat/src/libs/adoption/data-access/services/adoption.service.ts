import { Injectable } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { provideHttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdoptionService {
  #http = provideHttpClient();
  #query = injectQuery();

  // Todo create adoption request

  /**
   *     sendAdotionRequest( createAdoptionDto : CreateAdoptionDto) : AdoptionEntity{
   *    return this.#http.post(API_URL,PcreateAdoptionDto)
   * }
   *  */
}

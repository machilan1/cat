import { Injectable } from '@angular/core';
import { injectQuery } from '@ngneat/query';
import { AdoptionService } from '@cat/shared';

@Injectable({ providedIn: 'root' })
export class AdoptionStateService extends AdoptionService {
  #query = injectQuery();

  // Todo create adoption request

  // createAdoption(createAadoptionDto: CreateAdoptionDto) {

  //   return this.#query({
  //     queryKey:['adoption'] as const,
  //     queryFn:()=>this.adoptionControllerCreate({ body: createAadoptionDto })
  //   })

  // }
}

import { Injectable } from '@angular/core';
import { injectMutation, injectQueryClient } from '@ngneat/query';
import { AdoptionService, CatEntity } from '@cat/shared';
import { CreateAdoptionDto } from '@cat/shared';

@Injectable({ providedIn: 'root' })
export class AdoptionStateService extends AdoptionService {
  #mutation = injectMutation();
  #qc = injectQueryClient();

  // Todo create adoption request

  createAdoption(createAdoptionDto: CreateAdoptionDto) {
    return this.#mutation({
      mutationFn: (data: CreateAdoptionDto) => {
        console.log(data);
        return this.adoptionControllerCreate({ body: data });
      },
      onSuccess: (res, variables) => {
        const data = res;
        console.log(data, 'OnsuccessADOP');
        console.log(variables);

        const old: CatEntity | undefined = this.#qc.getQueryData([
          'cats',
          '' + data.id,
        ]);

        console.log('old', old);
        this.#qc.setQueryData(['cats', '' + data.id], () => {
          return old ? data : old;
        });
      },
    }).mutateAsync(createAdoptionDto);
  }
}

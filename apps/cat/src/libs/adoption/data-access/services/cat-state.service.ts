import { Injectable, inject, signal } from '@angular/core';
import { CatsService, CreateCatDto, UpdateCatDto } from '@cat/shared';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { Observable } from 'rxjs';
import { CatWithAdoption } from '../../../shared/data-access/models/cat-entity';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CatStateService {
  #catService = inject(CatsService);
  #query = injectQuery();
  #qc = injectQueryClient();
  #mutate = injectMutation();
  #router = inject(Router);

  findAll() {
    return this.#query({
      queryKey: ['cats'] as const,
      queryFn: () =>
        this.#catService.getAllCats() as Observable<CatWithAdoption[]>,
    });
  }

  findOne(catId: string) {
    return this.#query({
      queryKey: ['cats', catId] as const,
      queryFn: () =>
        this.#catService.catsControllerFindOne({
          id: catId,
        }) as Observable<CatWithAdoption>,
    });
  }

  createOne() {
    return this.#mutate({
      mutationFn: (data: CreateCatDto) =>
        this.#catService.catsControllerCreate({ body: data }),
      onSuccess: (res) => {
        console.log(res);
        const old = this.#qc.getQueryData(['cats']) as CatWithAdoption[];

        console.log(old);
        this.#qc.setQueryData(['cats'], () => {
          return [...old, res];
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  deleteOne() {
    return this.#mutate({
      mutationFn: ({ id }: { id: number }) =>
        this.#catService.catsControllerRemove({ id: '' + id }),
      onSuccess: (data, variables) => {
        this.#qc.setQueryData(['cats', variables.id], null);
        this.#qc.removeQueries({
          queryKey: ['cats', variables.id],
        });

        const old = this.#qc.getQueryData(['cats']) as CatWithAdoption[];
        const index = old.findIndex((cat) => cat.id === variables.id);
        old.splice(index, 1);
        this.#qc.setQueryData(['cats'], old);
        this.#router.navigate(['/']);
      },
      onError: (err) => {
        console.log({ err });
      },
    });
  }

  updateOne() {
    return this.#mutate({
      mutationFn: (value: { catId: number; patchLoad: UpdateCatDto }) =>
        this.#catService.catsControllerUpdate({
          body: value.patchLoad,
          id: value.catId.toString(),
        }),
      onSuccess: (res, variables) => {
        const old = this.#qc.getQueryData([
          'cats',
          variables.catId,
        ]) as CatWithAdoption;
        this.#qc.setQueryData(['cats', '' + variables.catId], () => ({
          ...old,
          ...res,
        }));
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
}

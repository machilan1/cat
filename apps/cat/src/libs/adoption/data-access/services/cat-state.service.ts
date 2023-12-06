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

  createOne(createCatDto: CreateCatDto) {
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
    }).mutateAsync(createCatDto);
  }

  deleteOne(catId: number) {
    return this.#mutate({
      mutationFn: ({ id }: { id: string }) =>
        this.#catService.catsControllerRemove({ id }),
      onSuccess: (data) => {
        this.#qc.setQueryData(['cats', catId], null);
        this.#qc.removeQueries({
          queryKey: ['cats', catId],
        });

        const old = this.#qc.getQueryData(['cats']) as CatWithAdoption[];
        const index = old.findIndex((cat) => cat.id === catId);
        old.splice(index, 1);
        this.#qc.setQueryData(['cats'], old);
        this.#router.navigate(['/']);
      },
      onError: (err) => {
        console.log({ err });
      },
    }).mutateAsync({ id: '' + catId });
    // }).mutateAsync({ id: '' + catId });
  }

  updateOne(catId: number, patchLoad: UpdateCatDto) {
    return this.#mutate({
      mutationFn: (value: { catId: number; patchLoad: UpdateCatDto }) =>
        this.#catService.catsControllerUpdate({
          body: value.patchLoad,
          id: value.catId.toString(),
        }),
      onSuccess: (res) => {
        const old = this.#qc.getQueryData(['cats', catId]) as CatWithAdoption;
        this.#qc.setQueryData(['cats', '' + catId], () => ({ ...old, ...res }));
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    }).mutateAsync({ catId, patchLoad });
  }
}

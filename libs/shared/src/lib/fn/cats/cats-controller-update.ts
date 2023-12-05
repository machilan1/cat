/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CatEntity } from '../../models/cat-entity';
import { UpdateCatDto } from '../../models/update-cat-dto';

export interface CatsControllerUpdate$Params {

/**
 * The ID of the task
 */
  id: string;
      body: UpdateCatDto
}

export function catsControllerUpdate(http: HttpClient, rootUrl: string, params: CatsControllerUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<CatEntity>> {
  const rb = new RequestBuilder(rootUrl, catsControllerUpdate.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CatEntity>;
    })
  );
}

catsControllerUpdate.PATH = '/cats/{id}';

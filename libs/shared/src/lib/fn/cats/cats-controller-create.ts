/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CatEntity } from '../../models/cat-entity';
import { CreateCatDto } from '../../models/create-cat-dto';

export interface CatsControllerCreate$Params {
      body: CreateCatDto
}

export function catsControllerCreate(http: HttpClient, rootUrl: string, params: CatsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<CatEntity>> {
  const rb = new RequestBuilder(rootUrl, catsControllerCreate.PATH, 'post');
  if (params) {
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

catsControllerCreate.PATH = '/cats';

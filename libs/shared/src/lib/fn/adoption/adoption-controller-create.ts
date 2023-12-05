/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AdoptionEntity } from '../../models/adoption-entity';
import { CreateAdoptionDto } from '../../models/create-adoption-dto';

export interface AdoptionControllerCreate$Params {
      body: CreateAdoptionDto
}

export function adoptionControllerCreate(http: HttpClient, rootUrl: string, params: AdoptionControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<AdoptionEntity>> {
  const rb = new RequestBuilder(rootUrl, adoptionControllerCreate.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AdoptionEntity>;
    })
  );
}

adoptionControllerCreate.PATH = '/adoption';

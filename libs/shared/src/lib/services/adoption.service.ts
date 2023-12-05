/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { adoptionControllerCreate } from '../fn/adoption/adoption-controller-create';
import { AdoptionControllerCreate$Params } from '../fn/adoption/adoption-controller-create';
import { AdoptionEntity } from '../models/adoption-entity';

@Injectable({ providedIn: 'root' })
export class AdoptionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `adoptionControllerCreate()` */
  static readonly AdoptionControllerCreatePath = '/adoption';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adoptionControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adoptionControllerCreate$Response(params: AdoptionControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<AdoptionEntity>> {
    return adoptionControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adoptionControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adoptionControllerCreate(params: AdoptionControllerCreate$Params, context?: HttpContext): Observable<AdoptionEntity> {
    return this.adoptionControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<AdoptionEntity>): AdoptionEntity => r.body)
    );
  }

}

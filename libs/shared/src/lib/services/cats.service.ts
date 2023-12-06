/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CatEntity } from '../models/cat-entity';
import { catsControllerCreate } from '../fn/cats/cats-controller-create';
import { CatsControllerCreate$Params } from '../fn/cats/cats-controller-create';
import { catsControllerFindOne } from '../fn/cats/cats-controller-find-one';
import { CatsControllerFindOne$Params } from '../fn/cats/cats-controller-find-one';
import { catsControllerRemove } from '../fn/cats/cats-controller-remove';
import { CatsControllerRemove$Params } from '../fn/cats/cats-controller-remove';
import { catsControllerUpdate } from '../fn/cats/cats-controller-update';
import { CatsControllerUpdate$Params } from '../fn/cats/cats-controller-update';
import { getAllCats } from '../fn/cats/get-all-cats';
import { GetAllCats$Params } from '../fn/cats/get-all-cats';

@Injectable({ providedIn: 'root' })
export class CatsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllCats()` */
  static readonly GetAllCatsPath = '/cats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCats()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCats$Response(params?: GetAllCats$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CatEntity>>> {
    return getAllCats(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCats(params?: GetAllCats$Params, context?: HttpContext): Observable<Array<CatEntity>> {
    return this.getAllCats$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CatEntity>>): Array<CatEntity> => r.body)
    );
  }

  /** Path part for operation `catsControllerCreate()` */
  static readonly CatsControllerCreatePath = '/cats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `catsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  catsControllerCreate$Response(params: CatsControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<CatEntity>> {
    return catsControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `catsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  catsControllerCreate(params: CatsControllerCreate$Params, context?: HttpContext): Observable<CatEntity> {
    return this.catsControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<CatEntity>): CatEntity => r.body)
    );
  }

  /** Path part for operation `catsControllerFindOne()` */
  static readonly CatsControllerFindOnePath = '/cats/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `catsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  catsControllerFindOne$Response(params: CatsControllerFindOne$Params, context?: HttpContext): Observable<StrictHttpResponse<CatEntity>> {
    return catsControllerFindOne(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `catsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  catsControllerFindOne(params: CatsControllerFindOne$Params, context?: HttpContext): Observable<CatEntity> {
    return this.catsControllerFindOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<CatEntity>): CatEntity => r.body)
    );
  }

  /** Path part for operation `catsControllerRemove()` */
  static readonly CatsControllerRemovePath = '/cats/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `catsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  catsControllerRemove$Response(params: CatsControllerRemove$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return catsControllerRemove(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `catsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  catsControllerRemove(params: CatsControllerRemove$Params, context?: HttpContext): Observable<void> {
    return this.catsControllerRemove$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `catsControllerUpdate()` */
  static readonly CatsControllerUpdatePath = '/cats/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `catsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  catsControllerUpdate$Response(params: CatsControllerUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<CatEntity>> {
    return catsControllerUpdate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `catsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  catsControllerUpdate(params: CatsControllerUpdate$Params, context?: HttpContext): Observable<CatEntity> {
    return this.catsControllerUpdate$Response(params, context).pipe(
      map((r: StrictHttpResponse<CatEntity>): CatEntity => r.body)
    );
  }

}

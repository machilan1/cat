import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApiModule } from '@cat/shared';
import { API_URL } from '../libs/shared/data-access/environments/environment';
import { provideQueryDevTools } from '@ngneat/query-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withFetch()),

    importProvidersFrom(ApiModule.forRoot({ rootUrl: API_URL })),
    provideQueryDevTools(),
  ],
};

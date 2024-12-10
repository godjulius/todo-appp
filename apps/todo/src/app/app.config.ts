import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {translateProviders} from "./i18n.config";
import {commonInterceptor, CommonInterceptor} from "./core/services/common.interceptor";
import {provideState, provideStore} from '@ngrx/store';
import {profileReducer} from "./store/user.reducer";
import { provideEffects } from '@ngrx/effects';
import {ProfileEffects} from "./store/user.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    ...translateProviders,
    // Use with interceptors from DI, example: class CommonInterceptor implements HttpInterceptor
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CommonInterceptor,
        multi: true
    },
    provideHttpClient(withInterceptors([commonInterceptor])),
    // provideStore should be empty
    provideStore(),
    // if you want to provide state, you should provide it by using provideState
    provideState({ name: 'profile', reducer: profileReducer }),
    provideEffects([ProfileEffects]),
],
};

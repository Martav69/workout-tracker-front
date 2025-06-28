import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './core/token-interceptor.service';
import { AuthService } from './core/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withEnabledBlockingInitialNavigation()),
  provideAnimations(),
  importProvidersFrom(FormsModule),
  provideHttpClient(withInterceptorsFromDi()),
  TokenInterceptor

]
};

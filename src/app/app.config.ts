import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {boardReducer} from './store/board/board.reducer';
import {localStorageMetaReducer} from './store/localStorage.metareducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore(
      { boardState: boardReducer },
      {
        metaReducers: [localStorageMetaReducer]
      }
    )
  ]
};

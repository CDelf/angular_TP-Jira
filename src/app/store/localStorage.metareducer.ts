import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from './app.state';

export const localStorageKey = 'appState';

export function localStorageMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if (action.type === INIT || action.type === UPDATE) {
      const savedState = localStorage.getItem(localStorageKey);
      if (savedState) {
        try {
          return JSON.parse(savedState);
        } catch {
          console.warn('Failed to parse state from localStorage');
        }
      }
    }

    const nextState = reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

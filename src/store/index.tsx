import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './app';
import type { PreloadedState } from '@reduxjs/toolkit'
import { eventsApi } from '@/services/events';

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NEXT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
    middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(eventsApi.middleware),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

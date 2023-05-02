import {configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import {persistReducer, PERSIST, PURGE, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'

const persistConfig = {
  key: 'root',
  storage: storage,
};
// 리듀서
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      }, }),
  devTools: true,
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

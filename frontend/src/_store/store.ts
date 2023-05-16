import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, PURGE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dashboardReducer from "./slices/dashboardSlice";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import transferPageReducer from "./slices/transferPageSlice"
import reportPageReducer from "./slices/reportPageSlice"

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ['transferPage', 'reportPage'],
};
// 리듀서
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
  dashboard: dashboardReducer,
  transferPage: transferPageReducer,
  reportPage: reportPageReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE],
      },
    }),
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

import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, PURGE, persistReducer, persistStore } from "redux-persist";

import dashboardReducer from "./slices/dashboardSlice";
import reportDetailReducer from "./slices/reportDetailSlice";
import reportPageReducer from "./slices/reportPageSlice";
import sseReducer from "./slices/sseSlice";
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice";
import trainReducer from "./slices/trainSlice";
import transferPageReducer from "./slices/transferPageSlice";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["transferPage", "reportPage", "train", "reportDetail"],
};
// 리듀서
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
  dashboard: dashboardReducer,
  transferPage: transferPageReducer,
  reportPage: reportPageReducer,
  reportDetail: reportDetailReducer,
  train: trainReducer,
  sseEvent: sseReducer,
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

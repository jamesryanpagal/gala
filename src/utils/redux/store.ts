import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from "./reducers";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: combinedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistore = persistStore(store);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

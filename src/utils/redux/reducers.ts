import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, PersistConfig } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import userReducer, { UserSlice } from "./slices/userSlice";

const persistConfig = <T>(
  key: string,
  version = 1,
  storage = AsyncStorage,
): PersistConfig<T> => ({
  key,
  version,
  storage,
});

const combinedReducers = combineReducers({
  user: persistReducer<UserSlice>(persistConfig("user"), userReducer),
});

export default combinedReducers;

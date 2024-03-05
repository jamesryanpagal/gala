import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../../api/query-fn/queryfn.api";

export type UserSlice = {
  token: string | null;
  user: UserResponse | null;
};

const initialState: UserSlice = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserSlice>) => {
      const { token, user } = payload;
      state.token = token;
      state.user = user;
    },
    updateUser: (state, { payload }: PayloadAction<UserResponse>) => {
      state.user = payload;
    },
    clearUser: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

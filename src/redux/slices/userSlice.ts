import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage, User } from "../../utils/localStorage";

interface initialStateType {
  user: User | null,
  name: string
}

const initialState: initialStateType= {
  user: getUserFromLocalStorage(),
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    authUser: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },

    logOut: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },
  },
});

export const {changeTheme, authUser, logOut} = userSlice.actions;

export default userSlice.reducer;

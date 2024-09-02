import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage, User } from "../../utils/localStorage";

interface initialStateType {
  user: User | null,
  name: string,
  navOpen: boolean
}

const initialState: initialStateType= {
  user: getUserFromLocalStorage(),
  name: "",
  navOpen: false
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

    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
    closeNav: (state) => {
      state.navOpen = false;
    }
  },
});

export const {changeTheme, authUser, logOut, toggleNav, closeNav} = userSlice.actions;

export default userSlice.reducer;

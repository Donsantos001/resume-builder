import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addUserToLocalStorage, removeUserFromLocalStorage, User } from "../../utils/localStorage";

interface initialStateType {
  user?: User,
  name: string
}

const initialState = {
  user: null,
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

export default userSlice.reducer;

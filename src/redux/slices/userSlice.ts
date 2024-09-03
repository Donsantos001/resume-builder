import { createSlice } from "@reduxjs/toolkit";
import { addProfilesToLocalStorage, addUserToLocalStorage, getProfilesFromLocalStorage, getUserFromLocalStorage, removeProfilesFromLocalStorage, removeUserFromLocalStorage, User } from "../../utils/localStorage";
import { UserProfile } from "../../pages/CreateProfile";

interface initialStateType {
  user: User | null,
  name: string,
  navOpen: boolean,
  profiles: UserProfile[],
}

const initialState: initialStateType= {
  user: getUserFromLocalStorage(),
  name: "",
  navOpen: false,
  profiles: getProfilesFromLocalStorage()
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // auth
    authUser: (state, { payload }) => {
      state.user = payload;
      addUserToLocalStorage(payload);
    },

    logOut: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
    },

    // nav
    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
    closeNav: (state) => {
      state.navOpen = false;
    },

    // profile
    addProfile: (state, { payload }) => {
      state.profiles.push(payload);
      addProfilesToLocalStorage([...state.profiles,payload]);
    },

    removeProfiles: (state) => {
      state.profiles = [];
      removeProfilesFromLocalStorage();
    }
  },
});

export const {authUser, logOut, toggleNav, closeNav,addProfile, removeProfiles} = userSlice.actions;

export default userSlice.reducer;

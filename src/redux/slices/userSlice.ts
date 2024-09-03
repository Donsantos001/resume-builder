import { createSlice } from "@reduxjs/toolkit";
import { addProfilesToLocalStorage, addUserToLocalStorage, getProfilesFromLocalStorage, getTemplate, getUserFromLocalStorage, removeProfilesFromLocalStorage, removeUserFromLocalStorage, setTemplate, User } from "../../utils/localStorage";
import { UserProfile } from "../../pages/CreateProfile";

interface initialStateType {
  user: User | null,
  name: string,
  navOpen: boolean,
  profiles: UserProfile[],
  template: number,
}

const initialState: initialStateType= {
  user: getUserFromLocalStorage(),
  name: "",
  navOpen: false,
  profiles: getProfilesFromLocalStorage(),
  template: getTemplate(),
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
      addProfilesToLocalStorage([...state.profiles]);
    },

    removeProfiles: (state) => {
      state.profiles = [];
      removeProfilesFromLocalStorage();
    },

    // template
    selectTemplate: (state, {payload}) => {
      state.template = payload
      setTemplate(payload)
    }
  },
});

export const {authUser, logOut, toggleNav, closeNav,addProfile, removeProfiles, selectTemplate} = userSlice.actions;

export default userSlice.reducer;

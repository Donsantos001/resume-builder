import { UserProfile } from "../pages/CreateProfile";

export interface User {
    emailAddress: string;
    firstname: string;
    lastname: string;
  }
  
  export const addUserToLocalStorage = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };
  export const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  export const addProfilesToLocalStorage = (profiles: UserProfile[]) => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  };
  export const removeProfilesFromLocalStorage = () => {
    localStorage.removeItem('profiles');
  };
  export const getProfilesFromLocalStorage = () => {
    const profileData = localStorage.getItem('profiles');
    return profileData ? JSON.parse(profileData) : [];
  };
  
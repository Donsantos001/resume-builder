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
  
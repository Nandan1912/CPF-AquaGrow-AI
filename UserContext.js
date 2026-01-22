// UserContext.js
import { createContext } from 'react';

export const defaultUser = {
  name: 'Demo User',
  contact: 'demo@cpf.com',
  profilePic: null,
};

export const UserContext = createContext({
  user: defaultUser,
  setUser: () => {},
});

export default UserContext;

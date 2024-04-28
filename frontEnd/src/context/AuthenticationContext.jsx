import { useState, createContext, useContext } from 'react';

//define the context
export const AuthenticationContext = createContext();

//use the context
export const useAuthentication = () => useContext(AuthenticationContext);

//state passed down to all component
export const AuthenticationProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AuthenticationContext.Provider value={value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

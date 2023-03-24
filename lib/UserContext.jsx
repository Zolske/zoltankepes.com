import React, { createContext, useContext, useState } from "react";

// create user context
const LoggedInUserContext = createContext();

// create context provider
export const LoggedInUserProvider = ({ children }) => {
  // const [loggedInUser, setLoggedInUser] = useState({
  //   user_is_logged_in: false,
  // });
  const [loggedInUser, setLoggedInUser] = useState(false);

  // the value passed in here will be accessible anywhere in our application
  // you can pass any value, in our case we pass our state and it's update method
  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

// useLoggedInUserContext will be used to use and update state accross the app
// we can access to data and setLoggedInUser using this method
// anywhere in any component that's inside LoggedInUserProvider
export const useLoggedInUserContext = () => useContext(LoggedInUserContext);

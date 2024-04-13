// UserContext.tsx
import React, { createContext, useState, useContext } from "react";

interface IUserContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const defaultState = {
  user: {},
  setUser: () => {}, // setUserのデフォルト関数
};

export const UserContext = createContext<IUserContext>(defaultState);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

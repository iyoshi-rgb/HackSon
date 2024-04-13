import React, { createContext, useState, useContext } from "react";

interface LocationContext {
  location: any;
  setLocation: React.Dispatch<React.SetStateAction<any>>;
}

const defaultState = {
  location: {},
  setLocation: () => {}, // setUserのデフォルト関数
};

export const LocationContext = createContext<LocationContext>(defaultState);

export const LocationProvider = ({ children }: any) => {
  const [location, setLocation] = useState({});

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

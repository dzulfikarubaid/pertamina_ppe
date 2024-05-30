// AppContext.js
import React, { createContext, useState } from 'react';

type AppContextType = {
    dashboard: boolean;
    setDashboard: React.Dispatch<React.SetStateAction<boolean>>;
    setCctv: React.Dispatch<React.SetStateAction<boolean>>;
    cctv: boolean;
    lm:boolean;
    setLm: React.Dispatch<React.SetStateAction<boolean>>;
};
const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }:any) => {
  const [dashboard, setDashboard] = useState(true);
  const [cctv, setCctv] = useState(false);
  const [lm, setLm] = useState(false);

  return (
    <AppContext.Provider value={{ dashboard,setDashboard, cctv, setCctv, lm, setLm }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

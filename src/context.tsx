import React, { createContext, useState } from 'react';

type AppContextType = {
  dashboard: boolean;
  setDashboard: () => void;
  cctv: boolean;
  setCctv: () => void;
  lm: boolean;
  setLm: () => void;
  account: boolean;
  setAccount: () => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: any) => {
  const [dashboard, setDashboardState] = useState(true);
  const [cctv, setCctvState] = useState(false);
  const [lm, setLmState] = useState(false);
  const [account, setAccountState] = useState(false);

  const setExclusiveState = (key: string) => {
    setDashboardState(key === 'dashboard');
    setCctvState(key === 'cctv');
    setLmState(key === 'lm');
    setAccountState(key === 'account');
  };

  const setDashboard = () => setExclusiveState('dashboard');
  const setCctv = () => setExclusiveState('cctv');
  const setLm = () => setExclusiveState('lm');
  const setAccount = () => setExclusiveState('account');

  return (
    <AppContext.Provider value={{ dashboard, setDashboard, cctv, setCctv, lm, setLm, account, setAccount }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

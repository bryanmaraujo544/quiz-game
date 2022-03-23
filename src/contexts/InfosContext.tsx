import { createContext, useState } from 'react';

interface User {
  id?: number;
  username?: string;
}

interface CtxProps {
  user: User;
  setUser: any;
}

export const InfosContext = createContext({} as CtxProps);

export const InfosContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User | {});
  console.log({ user });

  return (
    <InfosContext.Provider value={{ user, setUser }}>
      {children}
    </InfosContext.Provider>
  );
};

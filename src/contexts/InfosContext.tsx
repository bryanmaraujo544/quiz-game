import { createContext, useState } from 'react';
import io from 'socket.io-client';

interface User {
  id?: number;
  username?: string;
}

interface CtxProps {
  user: User;
  setUser: any;
  socket: any;
}

export const InfosContext = createContext({} as CtxProps);

const socket = io('http://localhost:5000');

export const InfosContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User | {});

  return (
    <InfosContext.Provider value={{ user, setUser, socket }}>
      {children}
    </InfosContext.Provider>
  );
};

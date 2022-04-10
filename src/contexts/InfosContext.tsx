import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface User {
  id?: number;
  username?: string;
}
interface CtxProps {
  user: User;
  setUser: any;
  socket: any;
  allRooms: any;
  setAllRooms: any;
  participant: any;
  setParticipant: any;
}

export const InfosContext = createContext({} as CtxProps);

const socket = io('http://localhost:5000');

export const InfosContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User | {});
  const [participant, setParticipant] = useState({});
  const [allRooms, setAllRooms] = useState([] as any);

  return (
    <InfosContext.Provider
      value={{
        user,
        setUser,
        socket,
        allRooms,
        setAllRooms,
        participant,
        setParticipant,
      }}
    >
      {children}
    </InfosContext.Provider>
  );
};

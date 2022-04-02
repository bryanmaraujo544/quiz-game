import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

interface User {
  id?: number;
  username?: string;
}
interface Room {
  id: number;
  title: string;
  photo_url: string;
}

interface Participant {
  id: number;
  username: string;
}

interface Gameroom {
  id: number;
  room: Room;
  participants: Participant[];
}

interface CtxProps {
  user: User;
  setUser: any;
  socket: any;
  allRooms: any;
  setAllRooms: any;
}

export const InfosContext = createContext({} as CtxProps);

const socket = io('http://localhost:5000');

export const InfosContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User | {});
  const [allRooms, setAllRooms] = useState([] as any);
  console.log('ALL ROOMS', allRooms);

  return (
    <InfosContext.Provider
      value={{ user, setUser, socket, allRooms, setAllRooms }}
    >
      {children}
    </InfosContext.Provider>
  );
};

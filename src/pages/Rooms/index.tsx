import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfosContext } from '../../contexts/InfosContext';
import RoomsService from '../../services/RoomsService';
import { Container, Room } from './styles';

interface Room {
  id: number;
  title: string;
  photo_url: string;
}

export const Rooms = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState([]);
  const { socket } = useContext(InfosContext);

  useEffect(() => {
    (async () => {
      const { data: allRooms } = await RoomsService.listAllRooms();
      setAllRooms(allRooms);
    })();
  }, []);

  function handleEnterRoom(room: any) {
    const usernameInStorage = localStorage.getItem('username');

    if (usernameInStorage) {
      navigate(`room/${room.id}`);
      socket.emit('join_room', {
        roomId: room.id,
        username: usernameInStorage,
      });
    } else {
      navigate(`login/${room.id}`);
    }
  }

  return (
    <Container>
      <h1>Rooms</h1>
      <div className="rooms">
        {allRooms.map((room: Room, i) => (
          <Room className="room" isFull={i === 1}>
            <p className="room-title">{room.title}</p>
            <div className="img-container">
              <img src={room.photo_url} alt="" />
              <p className="people-amount">
                2/<strong>10</strong>
              </p>
            </div>
            <button onClick={() => handleEnterRoom(room)} disabled={i === 1}>
              Entrar
            </button>
          </Room>
        ))}
      </div>
    </Container>
  );
};

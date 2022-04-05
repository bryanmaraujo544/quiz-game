import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InfosContext } from '../../contexts/InfosContext';
import RoomService from '../../services/RoomService';
import RoomsService from '../../services/RoomsService';
import { Container, Room } from './styles';

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

export const Rooms = () => {
  const navigate = useNavigate();
  // const [allRooms, setAllRooms] = useState([] as Gameroom[]);
  const { socket, allRooms, setAllRooms, setParticipant } =
    useContext(InfosContext);

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      console.log('person entered in room <Rooms/>', data);
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          const gameroom = room?.gamerooms[0];

          if (gameroom?.id === data?.room?.gamerooms[0]?.id) {
            return data.room;
          } else if (!gameroom) {
            return data.room;
          }
          return room;
        });
      });
    });

    socket.on('participant_left_this_room', (data: any) => {
      console.log('person left the room <Rooms />', data);
      setAllRooms((allRooms: any) => {
        return allRooms.map((room: any) => {
          const roomGameroom = room?.gamerooms[0];
          if (roomGameroom?.id === data?.gameroomId) {
            return data.room;
          } else if (!roomGameroom) {
            return data.room;
          }
          return room;
        });
      });
    });
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        if (allRooms.length === 0) {
          const { data: rooms } = await RoomsService.listAllRooms();
          setAllRooms(rooms);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  async function handleEnterRoom(room: any) {
    const usernameInStorage = localStorage.getItem('username');
    try {
      if (usernameInStorage) {
        const gameroom = await RoomService.getGameroomOfRoom({
          roomId: Number(room.id),
        });

        if (!gameroom) {
          // When some user enter in the room and he is the first to enter, any gameroom is opened
          // with that room, so the first user is "responsible" to create the gameroom
          const { gameroomCreated } = await RoomService.createGameroom({
            roomId: Number(room.id),
          });

          const { participantCreated, message } =
            await RoomService.createParticipant({
              username: usernameInStorage,
              gameroomId: gameroomCreated.id,
            });
          setParticipant(participantCreated);

          if (!participantCreated) {
            window.alert(message);
          } else {
            socket.emit('join_room', {
              gameroomId: gameroom.id,
              roomId: room.id,
              username: usernameInStorage,
            });
            navigate(`room/${room.id}`);
          }
          return;
        }

        // If there is some gameroom opened with that room we add the user as participant of that
        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: usernameInStorage,
            gameroomId: gameroom.id,
          });
        setParticipant(participantCreated);

        if (participantCreated === null) {
          window.alert(message);
        } else {
          socket.emit('join_room', {
            gameroomId: gameroom.id,
            roomId: room.id,
            username: usernameInStorage,
          });
          navigate(`room/${room.id}`);
        }
      } else {
        navigate(`login/${room.id}`);
      }
    } catch {
      // console.log('The participant already ')
    }
  }

  return (
    <Container>
      <h1>Rooms</h1>
      <div className="rooms">
        {allRooms.map(({ id, title, photo_url, gamerooms }: any, i: number) => (
          <Room
            className="room"
            isFull={gamerooms[0]?.has_started === true}
            key={id}
          >
            <p className="room-title">{title}</p>
            <div className="img-container">
              <img src={photo_url} alt="" />
              <p className="people-amount">
                {gamerooms[0]?.participants?.length || 0}/<strong>5</strong>
              </p>
            </div>
            <button
              onClick={() => handleEnterRoom({ id })}
              disabled={gamerooms[0]?.has_started}
            >
              Entrar
            </button>
          </Room>
        ))}
      </div>
    </Container>
  );
};

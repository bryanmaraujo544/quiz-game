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
  const { socket, allRooms, setAllRooms } = useContext(InfosContext);
  console.log({ allRooms });

  useEffect(() => {
    socket.on('person_entered_in_room', (data: any) => {
      setAllRooms((allRooms: any) => {
        return allRooms.map((gameroom: any) => {
          if (gameroom.id === data.gameroom.id) {
            console.log('iguaaal');
            return data.gameroom;
          }
          return gameroom;
        });
      });
    });

    socket.on(
      'participant_left_this_room',
      (data: {
        username: string;
        gameroomId: string;
        gameroom: any;
        participantsAmount: number;
      }) => {
        setAllRooms((allRooms: any) => {
          return allRooms.map((gameroom: any) => {
            if (gameroom.id === data.gameroom.id) {
              console.log('iguaaal');
              return data.gameroom;
            }
            return gameroom;
          });
        });
      }
    );
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        if (allRooms.length === 0) {
          const { data: rooms } = await RoomsService.listAllGamerooms();
          if (rooms.length === 0) {
            // const await Game
          } else {
            setAllRooms(rooms);
          }
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

          if (!participantCreated) {
            window.alert(message);
          }

          if (participantCreated) {
            socket.emit('join_room', {
              roomId: room.id,
              username: usernameInStorage,
            });
          }
          return;
        }

        // If there is some gameroom opened with that room we add the user as participant of that
        const { participantCreated, message } =
          await RoomService.createParticipant({
            username: usernameInStorage,
            gameroomId: gameroom.id,
          });
        console.log({ participantCreated, message });

        if (participantCreated === null) {
          window.alert(message);
        } else {
          socket.emit('join_room', {
            roomId: room.id,
            username: usernameInStorage,
          });
          console.log('ROOM ID', room.id);
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
        {allRooms.map(({ id, room, participants }, i) => (
          <Room className="room" isFull={i === 1} key={id}>
            <p className="room-title">{room.title}</p>
            <div className="img-container">
              <img src={room.photo_url} alt="" />
              <p className="people-amount">
                {participants.length}/<strong>10</strong>
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
